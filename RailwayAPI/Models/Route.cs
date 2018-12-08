﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RailwayAPI.Models
{
    public class Route
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StationFormId { get; set; }

        [Required]
        public int StationToId { get; set; } 

        [ForeignKey("StationFormId")]
        public virtual Station StationFrom { get; set; }

        [ForeignKey("StationToId")]
        public virtual Station StationTo { get; set; }
    }
}
