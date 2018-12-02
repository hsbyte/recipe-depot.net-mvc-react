using System.ComponentModel.DataAnnotations;

namespace RecipeDepotData.Models
{
    public class Season
    {
        public int Id { get; private set; }

        [Required]
        public string Description { get; set; }
    }
}
