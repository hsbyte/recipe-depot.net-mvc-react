using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
	public abstract class DateAsset
	{
		[Column(TypeName = "Date")]
		public DateTime Created { get; set; }

		[Column(TypeName = "Date")]
		public DateTime Modified { get; set; }

		public DateAsset()
		{
			Created = DateTime.UtcNow;
			Modified = DateTime.UtcNow;
		}
	}
}
