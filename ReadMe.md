1. To add migrations
    dotnet ef migrations add MigrationName --project .\RailwayAPI\ --startup-project .\RailwayAPI\

2. To remove last migrations
    dotnet ef migrations remove --project .\RailwayAPI\ --startup-project .\RailwayAPI\

3. To apply database update
    dotnet ef database update --project .\RailwayAPI\ --startup-project .\RailwayAPI\