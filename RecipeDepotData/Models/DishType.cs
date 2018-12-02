using System.ComponentModel.DataAnnotations;

namespace RecipeDepotData.Models
{
    public class DishType
    {
        public int Id { get; private set; }

        [Required]
        public string Type { get; set; }
    }
}
