using System.ComponentModel.DataAnnotations;

namespace RecipeDepotData.Models
{
    public class MainIngredient
    {
        public int Id { get; private set; }

        [Required]
        public string Ingredient { get; set; }
    }
}
