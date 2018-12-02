using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipeDepotData.Models
{
    public class Review : DateAsset
    {
        public int Id { get; set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Comment { get; set; }

        public int Rating { get; set; }
    }
}
