# Usa a imagem oficial do .NET 6 Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia as APIs para o container
COPY /out/ ./VagasAPI/

# Copiar o banco de dados SQLite para dentro do container
COPY /Vagas.db /app/Vagas.db

# Expose as portas
EXPOSE 5001
