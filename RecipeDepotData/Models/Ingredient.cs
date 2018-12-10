using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
  public class Ingredient
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    [ForeignKey("Recipe")]
    public int RecipeId { get; private set; }

    [MaxLength]
    public string Description { get; set; }
  }
}
