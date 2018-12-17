using System.Threading.Tasks;
using RailwayAPI.Models;

namespace RailwayAPI.Service
{
    public interface IAuthService
    {
        Task<bool> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string param);
        Task<bool> UserExists();
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        string GetToken(int id, string email);
    }
}