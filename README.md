# The Food Recipe Depot App

![](https://img.shields.io/badge/version-1.1.0-red.svg)

>A food recipe repository application project using .NET Core MVC React framework.

## Author
- Arnold Haban

## License
Released under the [MIT licence](http://opensource.org/licenses/MIT).

## Project Library Files

NuGet Packages:
* Microsoft.EntityFrameworksCore
* Microsoft.EntityFrameworksCore.Tools
* Microsoft.EntityFrameworksCore.SqlServer

### <span style="color:orange">**RecipeDepotData**</span>

Object relational mapping and data models' library.

>`RecipeDepotContext.cs`
>```c#
>{
>    public class RecipeDepotContext : DbContext
>    {
>        public RecipeDepotContext(DbContextOptions options) : base(options) { }
>        public DbSet<Patron> Patrons { get; set; }
>        ...
>    }
>}
>```


### <span style="color:orange">**RecipeDepot**</span>

Main application library.

Add reference to `RecipeDepotData` library.

Add `ConnectionStrings` to cennect to DB
>`appsettings.json`
>```json
>  "ConnectionStrings": {
>    "RecipeDepotConnection": "Server=[Your-MMSQL-server];Database=RecipeDepot;Trusted_Connection=True;MultipleActiveResultSets=true;"
>  }
>```

Pass the lambda function to `services.AddSbContext...`
>`Startup.cs`
>```c#
>...
>public void ConfigureServices(IServiceCollection services)
>{
>	services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
>	// Add DbContext service to connect to DB
>   services.AddDbContext<RecipeDepotContext>( options
>   	=> options.UseSqlServer(Configuration.GetConnectionString(*"RecipeDepotConnection"*)) );
>...
>```

#### Database Migration
In the Package Manager Console, run the following commands to build the database:
>```bash
>add-migration "Initial data models migration."
>update-database
>```

### <span style="color:orange">**RecipeDepotServices**</span>
Object model services library.

Add reference to `RecipeDepotData` library.

## Hosted
App is best viewed on mobile devices, and supports Microsoft Edge, Safari and Google Chrome web browsers.
>[https://recipe-app-a.firebaseapp.com](https://recipe-app-a.firebaseapp.com)

This project is still a work in progress.
