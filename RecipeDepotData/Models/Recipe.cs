using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
	public class Recipe : DateAsset
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int RecipeId { get; set; }

		public bool Shared { get; set; }

		[Required]
		[MaxLength]
		public string Title { get; set; }

		[Column(TypeName = "text")]
		[MaxLength]
		public string Description { get; set; }

		[Column(TypeName = "text")]
		[MaxLength]
		public string Ingredients { get; set; }

		[Column(TypeName = "text")]
		[MaxLength]
		public string Steps { get; set; }

		public string ImageUrl { get; set; }
		public int CookTime { get; set; }
		public int PrepTime { get; set; }

		[MaxLength(25)]
		public string DishType { get; set; }

		[MaxLength(25)]
		public string MainIngredient { get; set; }

		[MaxLength(25)]
		public string Seasons { get; set; }

		public string Email { get; set; }
		[ForeignKey("Email")]
		public virtual Patron Patron { get; set; }

		public virtual IList<Review> Reviews { get; set; }
  }
}
