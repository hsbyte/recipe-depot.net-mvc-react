using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
    public class Recipe
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
        public string Preparation { get; set; }

        public string ImageUrl { get; set; }
        public int CookTime { get; set; }
        public int PrepTime { get; set; }
        public string DishType { get; set; }

        [MaxLength]
        public string MainIngredient { get; set; }

        [MaxLength]
        public string Seasons { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        public virtual IEnumerable<Ingredient> Ingredients { get; set; }
        public virtual IEnumerable<Review> Reviews { get; set; }
    }
}
