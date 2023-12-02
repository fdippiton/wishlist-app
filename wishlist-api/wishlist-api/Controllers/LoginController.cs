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

        [HttpGet]
        public IActionResult GetNewCurrentUser()
        {
            var currentUser = GetCurrentUser();
            return Ok($"Hola {currentUser.UsuNombre}, tu correo es {currentUser.UsuCorreo}");
            //return Ok(currentUser);
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
                && user.UsuContrasena == userLogin.UsuContrasena && user.UsuEstatus == "A");

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
                new Claim(ClaimTypes.Role, user.UsuRol.ToString()),
                new Claim("UserId", user.UsuId.ToString()),

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

        private Usuario GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null) {

                var userIdClaim = identity.FindFirst("UserId");
                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
                {
                    // Cargar el usuario desde el contexto o la base de datos utilizando el ID del usuario
                    var currentUser = _context.Usuarios.FirstOrDefault(u => u.UsuId == userId);

                    if (currentUser != null)
                    {
                        return new Usuario
                        {
                            UsuNombre = currentUser.UsuNombre,
                            UsuApellidos = currentUser.UsuApellidos,
                            UsuCorreo = currentUser.UsuCorreo,
                            UsuRol = currentUser.UsuRol,
                        };
                    }
                }
            }

            return null;
        }

    }
}
