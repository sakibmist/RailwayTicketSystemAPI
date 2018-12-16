using System.ComponentModel.DataAnnotations;

namespace RailwayAPI.Dto
{
    public class UserDto
    {
         [Required] 
        public string Name { get; set; }

        [Required] 
        public string MobileNo { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}