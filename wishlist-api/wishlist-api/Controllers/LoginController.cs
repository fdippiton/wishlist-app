using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using wishlist_api.Models;
using wishlist_api.ViewModels;

namespace wishlist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly WishlistContext _context;
        private readonly IConfiguration _config;

        public LoginController(WishlistContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
        }

        [HttpPost]
        public IActionResult Login(LoginUser userLogin)
        {
            var user = Authenticate(userLogin);

            if (user != null) 
            {
                var token = Generate(user);
                return Ok(token);
            }

            return NotFound("Usuario no encontrado");   
        }

        private Usuario Authenticate(LoginUser userLogin) {
        
            var currentUser = _context.Usuarios.FirstOrDefault(user => user.UsuCorreo == userLogin.UsuCorreo 
                && user.UsuContrasena == userLogin.UsuContrasena);

            if (currentUser != null) {

                return currentUser;
            }

            return null;
        }

        private string Generate(Usuario user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Crear claims
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UsuNombre),
                new Claim(ClaimTypes.Surname, user.UsuApellidos),
                new Claim(ClaimTypes.Email, user.UsuCorreo),
                new Claim(ClaimTypes.Role, user.UsuRol.ToString())
         
            };

            // Crear el token
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
