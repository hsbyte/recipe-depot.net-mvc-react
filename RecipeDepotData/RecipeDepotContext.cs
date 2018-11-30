using Microsoft.EntityFrameworkCore;
using RecipeDepotData.Models;

namespace RecipeDepotData
{
    public class RecipeDepotContext : DbContext
    {
        public RecipeDepotContext(DbContextOptions options) : base(options) { }

        public DbSet<Patron> Patrons { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<MainIngredient> MainIngredients { get; set; }
        public DbSet<DishType> DishTypes { get; set; }
        public DbSet<Season> Seasons { get; set; }
    }
}
