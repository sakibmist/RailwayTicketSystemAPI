using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RailwayAPI.Dto;
using RailwayAPI.Helpers;
using RailwayAPI.Models;
using RailwayAPI.Service;

namespace RailwayAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // private readonly Context _dataContext;// AuthService e db te kaj kora hoyese tai ekane sudu IAuthService er instance create korlei hobe
        private readonly IAuthService _authService;
        public UsersController(IAuthService authService) // for authentication purpose
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(SignUpDto signupDto)
        {
            try
            {
                if (signupDto == null) return NotFound(); //404
                var user = new User
                {
                    Email = signupDto.Email,
                    MobileNo = signupDto.MobileNo,
                    Name = signupDto.Name
                };
                var isRegistered = await _authService.Register(user, signupDto.Password);
                if (isRegistered) return Ok();
                return BadRequest();
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin(SignInDto data)
        {
            try
            {
                var loginData = await _authService.Login(data.Email, data.Password);
                if (loginData == null) return Unauthorized();
                var token = _authService.GetToken(loginData.Id, loginData.Email);

                var authData = new AuthDto
                {
                    Name = loginData.Name,
                    Email = loginData.Email,
                    MobileNo = loginData.MobileNo,
                    CreatedAt = loginData.CreatedAt 
                };

                return Ok(new AuthReturnDto
                {
                    User = authData,
                        Token = token
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}