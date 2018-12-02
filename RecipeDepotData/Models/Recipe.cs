using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
    public class Recipe : DateAsset
    {
        public int Id { get; set; }
        public bool Shared { get; set; }

        [Required]
        public string Title { get; set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Description { get; set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Steps { get; set; }

        public string ImageUrl { get; set; }
        public int CookTime { get; set; }
        public int PrepTime { get; set; }

        [MaxLength]
        public string DishType { get; set; }

        [MaxLength]
        public string MainIngredient { get; set; }

        [MaxLength]
        public string Seasons { get; set; }

        public Patron Patron { get; set; }
        public virtual IEnumerable<Ingredient> Ingredients { get; set; }
        public virtual IEnumerable<Review> Reviews { get; set; }
    }
}
