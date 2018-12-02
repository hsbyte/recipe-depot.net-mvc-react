using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
    public class Patron : DateAsset
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Bio { get; set; }

        public bool Active { get; set; }
        public bool Online { get; set; }
        public string AvatarUrl { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Pinterest { get; set; }
        public string Instagram { get; set; }

        public virtual IEnumerable<Recipe> Recipes { get; set; }
        public virtual IEnumerable<Review> Reviews { get; set; }
    }
}
