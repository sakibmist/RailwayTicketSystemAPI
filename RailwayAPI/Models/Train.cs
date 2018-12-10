using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RailwayAPI.Models
{
    public class Train
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string Code { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }
}
