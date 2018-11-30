# The Food Recipe Depot App
![](https://img.shields.io/badge/version-0.0.1-green.svg)

>A food recipe repository application project using .NET Core MVC React framework.

## Author
- Arnold Haban
## License
Released under the [MIT licence](http://opensource.org/licenses/MIT).

This project is a work in progress.

## Project Library Files
>Required NuGet Packages
* Microsoft.EntityFrameworksCore
* Microsoft.EntityFrameworksCore.SqlServer
### RecipeDepot
Main application library.

>appsettings.json
Add `ConnectionStrings` to cennect to DB

`
  "ConnectionStrings": {
    "RecipeDepotConnection": *"Server=MSSQLDB;Database=RecipeDepot;Trusted_Connection=True;MultipleActiveResultSets=true;"*
  },
`

>Startup.cs
Pass the lamda function to `services.AddSbContext...`.

`
			// Add DbContext service to connect to DB
            services.AddDbContext<RecipeDepotContext>( options
                => options.UseSqlServer(Configuration.GetConnectionString(*"RecipeDepotConnection"*)) );
`


### RecipeDepotData
Object relational mapping and data models' library.

![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/dbschema.jpg)

>RecipeDepotContext.cs
`
    public class RecipeDepotContext : DbContext
    {
        public RecipeDepotContext(DbContextOptions options) : base(options) { }
        public DbSet<Patron> Patrons { get; set; }
        ...
    }
`

In the Package Manager Console, add data model migration and update database.

### RecipeDepotService (up next...)
Object model services library.

