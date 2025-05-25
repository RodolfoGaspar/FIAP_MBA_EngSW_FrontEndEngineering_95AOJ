using VagasApi.Data;
using VagasApi.ViewModels;
using SocketIOClient;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Configuração do cliente WebSocket
//var socket = new SocketIOClient.SocketIO("http://localhost:5004", new SocketIOOptions
var socket = new SocketIOClient.SocketIO("https://smartparkwebsocket-production.up.railway.app", new SocketIOOptions
{
    Reconnection = true,
    ReconnectionAttempts = 10,
    ReconnectionDelay = 1000,
    ReconnectionDelayMax = 5000,
    Transport = SocketIOClient.Transport.TransportProtocol.WebSocket,
    ConnectionTimeout = TimeSpan.FromSeconds(20)
});

// Variáveis para controle de conexão
bool isConnecting = false;
DateTime lastHeartbeat = DateTime.MinValue;
bool isCheckingConnection = false;
Queue<(string evento, object dados)> mensagensPendentes = new Queue<(string evento, object dados)>();

// Função para verificar a conexão
async Task CheckConnection()
{
    if (isCheckingConnection) return;
    
    isCheckingConnection = true;
    try
    {
        if (socket.Connected)
        {
            await socket.EmitAsync("ping");
            lastHeartbeat = DateTime.Now;
            Console.WriteLine($"[WebSocket] Ping enviado em {DateTime.Now:HH:mm:ss}");
        }
        else
        {
            Console.WriteLine($"[WebSocket] Conexão perdida detectada em {DateTime.Now:HH:mm:ss}");
            await socket.DisconnectAsync();
            await EnsureSocketConnection();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[WebSocket] Erro na verificação de conexão: {ex.Message} em {DateTime.Now:HH:mm:ss}");
        await socket.DisconnectAsync();
        await EnsureSocketConnection();
    }
    finally
    {
        isCheckingConnection = false;
    }
}

socket.OnConnected += async (sender, e) =>
{
    Console.WriteLine($"[WebSocket] Conectado ao servidor WebSocket em {DateTime.Now:HH:mm:ss}");
    isConnecting = false;
    lastHeartbeat = DateTime.Now;

    // Processa mensagens pendentes após reconexão
    while (mensagensPendentes.Count > 0)
    {
        var (evento, dados) = mensagensPendentes.Dequeue();
        try
        {
            await socket.EmitAsync(evento, dados);
            Console.WriteLine($"[Notificação] Mensagem pendente {evento} enviada com sucesso em {DateTime.Now:HH:mm:ss}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Notificação] Erro ao enviar mensagem pendente {evento}: {ex.Message}");
            mensagensPendentes.Enqueue((evento, dados)); // Recoloca na fila se falhar
            break;
        }
    }
};

socket.OnDisconnected += async (sender, e) =>
{
    Console.WriteLine($"[WebSocket] Desconectado do servidor WebSocket em {DateTime.Now:HH:mm:ss}");
    isConnecting = false;
    await EnsureSocketConnection();
};

socket.OnError += async (sender, e) =>
{
    Console.WriteLine($"[WebSocket] Erro: {e} em {DateTime.Now:HH:mm:ss}");
    isConnecting = false;
    await EnsureSocketConnection();
};


// Função para garantir que o socket está conectado
async Task EnsureSocketConnection()
{
    if (!socket.Connected && !isConnecting)
    {
        isConnecting = true;
        Console.WriteLine($"[WebSocket] Tentando reconectar em {DateTime.Now:HH:mm:ss}");
        
        try
        {
            // Força o fechamento da conexão atual se existir
            if (socket.Connected)
            {
                await socket.DisconnectAsync();
                Console.WriteLine($"[WebSocket] Conexão anterior fechada em {DateTime.Now:HH:mm:ss}");
            }

            int tentativas = 0;
            int maxTentativas = 5;
            int delayBase = 2000; // 2 segundos

            while (!socket.Connected && tentativas < maxTentativas)
            {
                try
                {
                    await socket.ConnectAsync();
                    Console.WriteLine($"[WebSocket] Reconexão bem-sucedida em {DateTime.Now:HH:mm:ss}");
                    isConnecting = false;
                    return;
                }
                catch (Exception ex)
                {
                    tentativas++;
                    int delay = delayBase * (int)Math.Pow(2, tentativas - 1); // Backoff exponencial
                    Console.WriteLine($"[WebSocket] Tentativa {tentativas} de reconexão falhou: {ex.Message} em {DateTime.Now:HH:mm:ss}. Próxima tentativa em {delay/1000} segundos");
                    await Task.Delay(delay);
                }
            }
        }
        finally
        {
            isConnecting = false;
            if (!socket.Connected)
            {
                Console.WriteLine($"[WebSocket] Todas as tentativas de reconexão falharam em {DateTime.Now:HH:mm:ss}");
            }
        }
    }
}

// Função para enviar notificação de forma assíncrona
async Task EnviarNotificacaoAsync(string evento, object dados)
{
    try
    {
        // Verifica a conexão antes de enviar a notificação
        await CheckConnection();

        if (!socket.Connected)
        {
            Console.WriteLine($"[WebSocket] Socket desconectado ao tentar enviar {evento} em {DateTime.Now:HH:mm:ss}");
            mensagensPendentes.Enqueue((evento, dados));
            await EnsureSocketConnection();
            return;
        }

        await socket.EmitAsync(evento, dados);
        Console.WriteLine($"[Notificação] {evento} enviada com sucesso em {DateTime.Now:HH:mm:ss}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[Notificação] Erro ao enviar {evento}: {ex.Message} em {DateTime.Now:HH:mm:ss}");
        mensagensPendentes.Enqueue((evento, dados));
        await EnsureSocketConnection();
    }
}

// Inicializa a conexão
await EnsureSocketConnection();

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Habilita o CORS na aplicação
app.UseCors("PermitirTudo");

var estacionamenos = new List<dynamic>
    {
        new { Id = "a080010f-6774-485c-826c-4e8a9c7896a1", Nome = "Estaciona Fácil" },
        new { Id = "35e38ce9-bd33-4152-8df6-f8f6415a1027", Nome = "Park & Go" },
        new { Id = "849adfa0-a25a-4aac-ae3d-c1db9e965b91", Nome = "Vaga Certa" },
        new { Id = "5584a759-e39a-4fef-8c2d-30cafbf0c4cc", Nome = "Espaço Flex" },
        new { Id = "fbbcc5a7-5900-46e6-b8b5-878c6292bd47", Nome = "Drive Park" }
    };

app.MapGet("/v1/vagas", (AppDbContext context) =>
{
    var vagas = context.Vagas?.ToList();
    vagas?.ForEach(v => v.NomeEstacionamento = estacionamenos.FirstOrDefault(e => Guid.Parse(e.Id) == v.IdEstacionamento)?.Nome);
    return vagas is not null
        ? Results.Ok(new { vagas })
        : Results.NotFound();
}).Produces<object>();

app.MapGet("/v1/vagas/{id}", (string id, AppDbContext context) =>
{
    if (Guid.TryParse(id, out Guid idVaga))
    {
        var vaga = context?.Vagas?.FirstOrDefault(v => v.Id == Guid.Parse(id));
        if (vaga != null)
        {
            vaga.NomeEstacionamento = estacionamenos.FirstOrDefault(e => Guid.Parse(e.Id) == vaga.IdEstacionamento)?.Nome;
            return Results.Ok(vaga);
        }
        return Results.NotFound();
    }
    return Results.NotFound();
}).Produces<Vaga>();

app.MapPost("/v1/vagas", async (AppDbContext context, CreateVagaViewModel model) =>
{
    var vaga = model.MapTo();
    if (!model.IsValid)
    {
        return Results.BadRequest(model.Notifications);
    }

    context?.Vagas?.Add(vaga);
    context?.SaveChanges();

    vaga.NomeEstacionamento = estacionamenos.FirstOrDefault(e => Guid.Parse(e.Id) == vaga.IdEstacionamento)?.Nome;

    // Envia notificação de forma assíncrona
    _ = EnviarNotificacaoAsync("notificacaoNovaVaga", new
    {
        id = vaga.Id.ToString(),
        idEstacionamento = vaga.IdEstacionamento.ToString(),
        nomeEstacionamento = vaga.NomeEstacionamento,
        status = (int)vaga.Status,
        tipoVaga = (int)vaga.TipoVaga,
        valorHora = vaga.ValorHora
    });

    return Results.Created($"/v1/vagas/{vaga.Id}", vaga);
});

app.MapPut("/v1/vagas", async (AppDbContext context, AlterVagaViewModel model) =>
{
    var modelVaga = model.MapTo();
    if (!model.IsValid)
    {
        return Results.BadRequest(model.Notifications);
    }

    var vaga = context?.Vagas?.FirstOrDefault(v => v.Id == model.Id);

    if (vaga is not null)
    {
        vaga.IdEstacionamento = model.IdEstacionamento;
        vaga.Status = model.Status;
        vaga.TipoVaga = model.TipoVaga;
        vaga.ValorHora = model.ValorHora;

        context?.SaveChanges();

        // Envia notificação de forma assíncrona
        _ = EnviarNotificacaoAsync("notificacaoAlteracaoDeVaga", new
        {
            id = vaga.Id.ToString(),
            idEstacionamento = vaga.IdEstacionamento.ToString(),
            status = (int)vaga.Status,
            tipoVaga = (int)vaga.TipoVaga,
            valorHora = vaga.ValorHora
        });

        return Results.Created($"/v1/vagas/{modelVaga.Id}", modelVaga);
    }

    return Results.NoContent();
});

app.MapDelete("/v1/vagas/{id}", async (string id, AppDbContext context) =>
{
    if (Guid.TryParse(id, out Guid idVaga))
    {
        var vaga = context?.Vagas?.FirstOrDefault(v => v.Id == idVaga);
        if (vaga is not null)
        {
            context?.Remove(vaga);
            if (context?.SaveChanges() > 0)
            {
                // Envia notificação de forma assíncrona
                _ = EnviarNotificacaoAsync("notificacaoExcluirVaga", new
                {
                    id = vaga.Id.ToString()
                });
                return Results.NoContent();
            }
        }
    }
    return Results.NotFound();
});

app.MapGet("/v1/vagas/status", () =>
{
    return Enum.GetValues(typeof(StatusVagaEnum))
               .Cast<StatusVagaEnum>()
               .Select(s => new { Id = s, Name = Enum.GetName(s) })
               .ToList();
}).Produces<dynamic>();

app.MapGet("/v1/vagas/tipos", () =>
{
    return Enum.GetValues(typeof(TipoVagaEnum))
               .Cast<TipoVagaEnum>()
               .Select(s => new { Id = s, Name = Enum.GetName(s) })
               .ToList();
}).Produces<dynamic>();

app.MapGet("/v1/estacionamentos", () =>
{
    return Results.Ok(new { estacionamenos });
}).Produces<object>();

app.Run();
