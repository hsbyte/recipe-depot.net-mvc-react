using Microsoft.EntityFrameworkCore;
using RecipeDepotData;
using RecipeDepotData.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RecipeDepotServices
{
    public class RecipeDepotService : IRecipeDepotAsset
    {
        private RecipeDepotContext _context;

        public RecipeDepotService(RecipeDepotContext context)
        {
            _context = context;
        }

        public void Append(Recipe newRecipe)
        {
            _context.Add(newRecipe);
            _context.SaveChanges();
        }

        public IEnumerable<Recipe> GetAllRecipes()
        {
            return _context.Recipes
                .Include(asset => asset.Ingredients)
                .Include(asset => asset.Reviews);
        }

        public Recipe GetByRecipeId(int id)
        {
            return GetAllRecipes()
                .FirstOrDefault(asset => asset.Id == id);
        }

        public Patron GetPatron(int id)
        {
            return GetByRecipeId(id).Patron;
        }
    }
}
