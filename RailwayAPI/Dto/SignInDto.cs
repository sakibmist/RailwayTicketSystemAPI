using System.ComponentModel.DataAnnotations;

namespace RailwayAPI.Dto
{
    public class SignInDto
    {
        [Required(ErrorMessage = "Email is Required!")]
        public string Email { get; set; } 
        [Required(ErrorMessage = "Password is Required!")]
        [StringLength(32,ErrorMessage ="Maximum Length is 32 characters!")]
        public string Password { get; set; }
    }
}