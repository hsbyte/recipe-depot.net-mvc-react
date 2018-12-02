using System;
using System.Collections.Generic;
using System.Text;

namespace RecipeDepotData.Models
{
    public abstract class DateAsset
    {
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
