using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipeDepotData.Models
{
    public class Access : DateAsset
    {
        public int Id { get; private set; }

        public string Passwd { get; private set; }

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
    }
}
