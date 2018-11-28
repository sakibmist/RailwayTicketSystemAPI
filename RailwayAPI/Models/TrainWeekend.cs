using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RailwayAPI.Models
{
    public class TrainWeekend
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string WeekDayName { get; set; }

        [Required] 
        public int TrainId { get; set; }

        [ForeignKey("TrainId")]
        public virtual Train Train { get; set; }
    }
}
