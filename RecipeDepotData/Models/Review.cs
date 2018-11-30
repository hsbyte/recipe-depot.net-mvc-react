using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipeDepotData.Models
{
    public class Review
    {
        public int Id { get; set; }

        [Column(TypeName = "text")]
        [MaxLength]
        public string Comment { get; set; }

        public int Rating { get; set; }

        [Required]
        public DateTime Posted { get; set; }

        public DateTime Modified { get; set; }
    }
}
