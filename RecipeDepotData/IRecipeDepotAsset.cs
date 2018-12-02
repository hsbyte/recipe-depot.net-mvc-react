using RecipeDepotData.Models;
using System.Collections.Generic;

namespace RecipeDepotData
{
    public interface IRecipeDepotAsset
    {
        IEnumerable<Recipe> GetAllRecipes();
        Recipe GetByRecipeId(int id);
        void Append(Recipe newRecipe);

        Patron GetPatron(int id);

    }
}
