FROM microsoft/dotnet:2.1-aspnetcore-runtime
ARG source
EXPOSE 80
WORKDIR /app

COPY ${source:-bin/Release/netcoreapp2.1/publish} .
ENTRYPOINT ["dotnet", "RecipeDepot.dll"]