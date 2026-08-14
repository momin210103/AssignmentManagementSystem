# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY src/AMS.API/AMS.API.csproj src/AMS.API/
COPY src/AMS.Application/AMS.Application.csproj src/AMS.Application/
COPY src/AMS.Domain/AMS.Domain.csproj src/AMS.Domain/
COPY src/AMS.Infrastructure/AMS.Infrastructure.csproj src/AMS.Infrastructure/

RUN dotnet restore src/AMS.API/AMS.API.csproj

COPY src/ src/

RUN dotnet publish src/AMS.API/AMS.API.csproj \
    -c Release \
    -o /app/publish


# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENV PORT=10000

EXPOSE 10000

ENTRYPOINT ["sh", "-c", "dotnet AMS.API.dll --urls http://0.0.0.0:${PORT}"]