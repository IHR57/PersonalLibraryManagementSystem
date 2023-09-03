#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["PersonalLibraryManagement.WebAPI/PersonalLibraryManagement.WebAPI.csproj", "PersonalLibraryManagement.WebAPI/"]
COPY ["PersonalLibraryManagement.Application/PersonalLibraryManagement.Application.csproj", "PersonalLibraryManagement.Application/"]
COPY ["PersonalLibraryManagement.Domain/PersonalLibraryManagement.Domain.csproj", "PersonalLibraryManagement.Domain/"]
COPY ["PersonalLibraryManagement.Identity/PersonalLibraryManagement.Identity.csproj", "PersonalLibraryManagement.Identity/"]
COPY ["PersonalLibraryManagement.Infrastructure/PersonalLibraryManagement.Infrastructure.csproj", "PersonalLibraryManagement.Infrastructure/"]
COPY ["PersonalLibraryManagement.Persistence/PersonalLibraryManagement.Persistence.csproj", "PersonalLibraryManagement.Persistence/"]
RUN dotnet restore "PersonalLibraryManagement.WebAPI/PersonalLibraryManagement.WebAPI.csproj"
COPY . .
WORKDIR "/src/PersonalLibraryManagement.WebAPI"
RUN dotnet build "PersonalLibraryManagement.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PersonalLibraryManagement.WebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PersonalLibraryManagement.WebAPI.dll"]