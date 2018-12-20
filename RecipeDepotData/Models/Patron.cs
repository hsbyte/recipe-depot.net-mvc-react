using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeDepotData.Models
{
  public class Patron : DateAsset
	{
    [Key]
    [Required]
    [MaxLength(50)]
    public string Email { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

		[MaxLength(150)]
		public string AvatarUrl { get; set; }

		[Required]
		[MaxLength(20)]
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

		public static implicit operator Patron(string v)
		{
			throw new NotImplementedException();
		}
	}
}
