using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RailwayAPI.Models
{
    public class TrainClass
    {
        [Key]
        public int Id { get; set; }

        [Required] 
        public int ClassId { get; set; }

        [Required]
        public double Price { get; set; }

        [Required] 
        public int TrainId { get; set; }

        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }

        [ForeignKey("TrainId")]
        public virtual Train Train { get; set; }

    }
}
