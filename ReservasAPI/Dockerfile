# Usa a imagem do SDK do .NET 6 para build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copia os arquivos do projeto
COPY ["ReservasAPI.csproj", "./"]
RUN dotnet restore

# Copia o resto dos arquivos e faz o build
COPY . .
RUN dotnet build -c Release -o /app/build

# Publica a aplicação
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Imagem final
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Copia os arquivos publicados
COPY --from=build /app/publish .
COPY ./Reservas.db /app/Reservas.db

# Define a variável de ambiente PORT que o Railway fornece
ENV PORT=5002
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}

# Expose a porta dinâmica
EXPOSE ${PORT}

# Inicia a aplicação
ENTRYPOINT ["dotnet", "ReservasAPI.dll"]