using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RailwayAPI.Models
{
    public class RouteTrain
    {
        [Key]
        public int Id { get; set; }         
  
        [Required]
        public int RouteId  { get; set; }

        [Required]
        public int TrainId { get; set; }  
        
        public TimeSpan  DepartureTime { get; set; }

        [ForeignKey("TrainId")]
        public virtual Train Train { get; set; }

        [ForeignKey("RouteId")]
        public virtual Route Route { get; set; }

    }
}
