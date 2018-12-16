using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RailwayAPI.Dto;
using RailwayAPI.Models;

namespace RailwayAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Context _dataContext;
        private readonly IOptions<Middleware> _config;
        public UsersController(Context dataContext, IOptions<Middleware> config) // for authentication purpose
        {
            _dataContext = dataContext;
            _config = config;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            try
            {
                var items = _dataContext.Users.ToList();
                return Ok(items); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); //400
            }
        }

        [HttpPost("sign-up")]
        public IActionResult SighUpData(UserDto user)
        {
            try
            {
                if (user == null) return NotFound(); //404
                _dataContext.Users.Add(user);
                _dataContext.SaveChanges();
                var token = GetToken(authData.Id, authData.UserName);

                return Ok(new AuthReturnDto
                {
                    User = authData,
                        Token = token
                });
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("check/{mobileNo}")]
        public IActionResult CheckIsAccountNoExists(string mobileNo)
        {
            try
            {
                var isExist = _dataContext.Users.Any(x => x.MobileNo.ToLower() == mobileNo.ToLower());
                return Ok(new { IsExist = isExist }); //200
            }
            catch (System.Exception)
            {

                return BadRequest(); //400
            }
        }

    }
}