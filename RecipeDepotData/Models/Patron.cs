using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
    public class Patron
    {
        public int Id { get; private set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public virtual Access Access { get; set; }
    }
}
