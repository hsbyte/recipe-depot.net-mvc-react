using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
  public class Patron
  {
    [Key]
    [Required]
    [MaxLength(50)]
    public string Email { get; set; }

    public string AvatarUrl { get; set; }

    [Required]
    [MaxLength(30)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(30)]
    public string LastName { get; set; }

    public Access Access { get; set; }
  }
}
