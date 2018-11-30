using System.ComponentModel.DataAnnotations;

namespace RecipeDepotData.Models
{
    public class Season
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
