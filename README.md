# The Food Recipe Depot App

![](https://img.shields.io/badge/version-1.0.0-green.svg)

>A food recipe repository single page CRUD web application project using .NET Core MVC React-Bootstrap framework. Using C# language for backend and API HTTP services, and React-Bootstrap for front-end dev.
>This simple CRUD website is a .NET Course project for ComIT and Manitoba Start.

## Author
- Arnold Haban

## License
Released under the [MIT licence](http://opensource.org/licenses/MIT).

## Project Library Files

NuGet Packages:
* Microsoft.EntityFrameworksCore
* Microsoft.EntityFrameworksCore.Tools
* Microsoft.EntityFrameworksCore.SqlServer

### <span style="color:green">**RecipeDepotData - Domain Models**</span>

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

### <span style="color:greene">**RecipeDepot**</span>

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

### <span style="color:green">**Controllers**</span>
Object controllers.
>```bash
>RecipesController.cs
>PatronsController.cs
>...and more
>```

### <span style="color:green">**React: Containers**</span>
Client view containers.
>```bash
>Home.jsx
>Login.jsx
>Signup.jsx
>FetchRecipe.jsx
>HandlerRecipe.jsx
>404.jsx -> Not Found Error container
>...and more
>```

### <span style="color:green">**React: Components**</span>
Client view components.
>```bash
>ChildRoute.jsx -> passing of props to other routes component
>SubmitButton.jsx -> customized submit button component
>...and more
>```

### <span style="color:green">Some Screenshots</span>

#### Screenshots

![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/view-screenshot.jpg)


![](https://github.com/hsbyte/recipe-depot.net-mvc-react/blob/master/.md/view-screenshot-1.jpg)

#### <span style="color:green">HTTP RESTful services and endpoints</span>
~~~
**`[web-url]/api/Recipes`** -> JSON format GET request for all recipes.

**`[web-url]/api/Recipes/{id}`** -> JSON format GET request for a specific recipe.

...and more
~~~

**Note**: *Shown are postings of dummy recipes, images and information for demonstration purpose. Database file and food images are not included in this repo. To build the database, use the RecipeDepotData code-first EF.*
