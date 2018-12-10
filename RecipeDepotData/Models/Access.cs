using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
    public class Access : DateAsset
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }

        [ForeignKey("Patron")]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        public string Passwd { get; set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Bio { get; set; }

        public bool Active { get; set; }
        public bool Online { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Pinterest { get; set; }
        public string Instagram { get; set; }
    }
}
