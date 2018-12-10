# The Food Recipe Depot App

![](https://img.shields.io/badge/version-0.1.0-blue.svg)

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

### <span style="color:orange">**RecipeDepotData - Domain Models**</span>

Object relational mapping and data models' library using code first approach.

>`RecipeDepotContext.cs`
>```c#
>public class RecipeDepotContext : DbContext
>{
>    public RecipeDepotContext(DbContextOptions options) : base(options) { }
>    public DbSet<Patron> Patrons { get; set; }
>    ...
>}
>```

![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/dbschema.jpg)

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
>public void ConfigureServices(IServiceCollection services)
>{
>	services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
>	// Add DbContext service to connect to DB
>   services.AddDbContext<RecipeDepotContext>( options
>   	=> options.UseSqlServer(Configuration.GetConnectionString("RecipeDepotConnection")) );
>...
>```

#### Database Migration
In the Package Manager Console, run the following commands to build the database:
>```bash
>add-migration "Initial data models migration."
>update-database
>```

### <span style="color:orange">**Controllers**</span>
Object controllers.
>```bash
>RecipesController.cs
>PatronsController.cs
>```

### <span style="color:orange">**React: Containers**</span>
Client view containers.
>```bash
>Home.jsx
>Login.jsx
>Signup.jsx
>FetchRecipe.jsx
>HandlerRecipe.jsx
>404.jsx -> Not Found Error container
>```

### <span style="color:orange">**React: Components**</span>
Client view components.
>```bash
>ChildRoute.jsx -> passing of props to other routes component
>SubmitButton.jsx -> Customized submit button component
>```

### <span style="color:orange">Some Screenshots</span>

#### Patron log in and sign up

![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/view-screenshoot.jpg)

### Recipe gallery

![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/view-screenshoot-1.jpg)

### Recipe detail

![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/view-screenshoot-2.jpg)

**Note**: *Shown are postings of dummy recipes and information for demonstration purpose. Database and food images not included in this repo.*

This project is still a work in progress.
