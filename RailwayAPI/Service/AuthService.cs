using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RailwayAPI.Helpers;
using RailwayAPI.Models;

namespace RailwayAPI.Service
{
    public class AuthService : IAuthService
    {
        private readonly Context _dataContext;
        private readonly IOptions<JwtConfig> _config;

        public AuthService(Context dataContext,IOptions<JwtConfig> config)
        {
            _dataContext = dataContext; 
            _config = config;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        //for login
        public async Task<User> Login(string email, string password)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null) return null;
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) return null;
            return user;
        }

        public async Task<bool> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _dataContext.Users.Add(user);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public Task<bool> UserExists(string param)
        {
            throw new System.NotImplementedException();
        }

            //get token
        public string GetToken(int id, string email)
        {
            try
            {
                var claims = new []
                {
                    new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                    new Claim(ClaimTypes.Name, email)
                };

                var privateKey = _config.Value.PrivateKey;
                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(privateKey)
                );

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(7),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Task<bool> UserExists()
        {
            throw new System.NotImplementedException();
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }
    }
}