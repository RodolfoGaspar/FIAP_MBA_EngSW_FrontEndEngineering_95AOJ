# Usa a imagem do SDK do .NET 6 para build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copia os arquivos do projeto
COPY ["VagasAPI/VagasAPI.csproj", "VagasAPI/"]
RUN dotnet restore "VagasAPI/VagasAPI.csproj"

# Copia o resto dos arquivos e faz o build
COPY . .
RUN dotnet build "VagasAPI/VagasAPI.csproj" -c Release -o /app/build

# Publica a aplicação
RUN dotnet publish "VagasAPI/VagasAPI.csproj" -c Release -o /app/publish

# Imagem final
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Copia os arquivos publicados
COPY --from=build /app/publish .
COPY ./Vagas.db /app/Vagas.db

# Define a variável de ambiente PORT que o Railway fornece
ENV PORT=5001
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}

# Expose a porta dinâmica
EXPOSE ${PORT}

# Inicia a aplicação
CMD ["dotnet", "VagasAPI.dll"]