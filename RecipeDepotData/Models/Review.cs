using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
  public class Review : DateAsset
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }

    [Required]
    [ForeignKey("Patron")]
    public string Email { get; set; }

    [Column(TypeName = "text")]
    [MaxLength]
    public string Comment { get; set; }

    [Range(0, 5)]
    public int Rating { get; set; }

    public Patron Patron { get; set; }
  }
}
