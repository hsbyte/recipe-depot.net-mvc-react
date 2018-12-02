using RecipeDepotData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeDepot.Models.Recipes
{
    public class RecipeIndexListModel
    {
        public int Id { get; set; }
        public bool Shared { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Steps { get; set; }
        public string ImageUrl { get; set; }
        public int CookTime { get; set; }
        public int PrepTime { get; set; }
        public string DishType { get; set; }
        public string MainIngredient { get; set; }
        public string Seasons { get; set; }

        // Patron attributes
        public string Name { get; set; }

        public ICollection<Ingredient> Ingredients { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
