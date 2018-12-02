using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipeDepotData.Models
{
    public class Review : DateAsset
    {
        public int Id { get; private set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Comment { get; set; }

        public int Rating { get; set; }

        public virtual Patron Patron { get; set; }
    }
}
