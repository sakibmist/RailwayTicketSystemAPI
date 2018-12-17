using System;

namespace RailwayAPI.Dto
{
    public class AuthDto
    {        
        public int Id { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}