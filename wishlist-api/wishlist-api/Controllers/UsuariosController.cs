using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wishlist_api.Models;
using Microsoft.AspNetCore.Authorization;
using wishlist_api.ViewModels;

namespace wishlist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly WishlistContext _context;

        public UsuariosController(WishlistContext context)
        {
            _context = context;
        }

        // Busqueda de usuarios en searchbar
        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios([FromQuery] string searchQuery)
        {
            try
            {
                if (_context.Usuarios == null)
                {
                    return NotFound();
                }

                // Aplicar filtro de búsqueda si se proporciona una consulta de búsqueda
                var usuariosQuery = _context.Usuarios
                    .Include(x => x.UsuRolNavigation)
                    .Where(x => x.UsuEstatus == "A");

                if (!string.IsNullOrEmpty(searchQuery))
                {
                    usuariosQuery = usuariosQuery
                        .Where(u => EF.Functions.Like(u.UsuNombre + " " + u.UsuApellidos, $"%{searchQuery}%"));
                }

                var usuarios = await usuariosQuery
                    .Select(usuario => new UsuariosViewModel
                    {
                        UsuId = usuario.UsuId,
                        UsuNombre = usuario.UsuNombre,
                        UsuApellidos = usuario.UsuApellidos,
                        UsuCorreo = usuario.UsuCorreo,
                        UsuContrasena = usuario.UsuContrasena,
                        UsuProfilePhoto = usuario.UsuProfilePhoto,
                        UsuRol = usuario.UsuRol,
                        UsuEstatus = usuario.UsuEstatus,
                    })
                    .ToListAsync();
                
                // Serializa los datos utilizando las opciones configuradas
                var jsonResult = JsonSerializer.Serialize(usuarios);

                // Devuelve el resultado serializado
                return Content(jsonResult, "application/json");
            }
            catch (Exception ex)
            {
                // Registra la excepción para obtener más detalles en los registros
                Console.WriteLine($"Error al realizar la operación GET: {ex}");

                // Registra la excepción interna si está presente
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException}");
                }

                // Devuelve un error interno del servidor con un mensaje personalizado
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // Obtener todos los usuarios para lista admin
        // GET: api/Usuarios/5
        [HttpGet("listaUsuarios")]
        public async Task<ActionResult<Usuario>> GetUsuarios()
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var usuarios = await _context.Usuarios
                .Include(x => x.UsuRolNavigation)
                .Select(usuario => new UsuariosViewModel
                {
                    UsuId = usuario.UsuId,
                    UsuNombre = usuario.UsuNombre,
                    UsuApellidos = usuario.UsuApellidos,
                    UsuCorreo = usuario.UsuCorreo,
                    UsuContrasena = usuario.UsuContrasena,
                    UsuProfilePhoto = usuario.UsuProfilePhoto,
                    UsuRol = usuario.UsuRol,
                    UsuEstatus = usuario.UsuEstatus,
                })
                .ToListAsync();

            if (usuarios == null)
            {
                return NotFound();
            }

            var jsonResult = JsonSerializer.Serialize(usuarios);

            // Devuelve el resultado serializado
            return Content(jsonResult, "application/json");
        }


        // Obtener un usuario por id
        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
          if (_context.Usuarios == null)
          {
              return NotFound();
          }
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }
            return usuario;
        }

        // Actualizar usuario
        // PUT: api/Usuarios/5
        [Produces("application/json")]
        [Consumes("multipart/form-data")]
        [HttpPut("modificarUsuario/{id}")]
        [Authorize]
        public async Task<IActionResult> PutUsuario(int id, [FromForm] Usuario usuario)
        {
            if (id != usuario.UsuId)
            {
                return BadRequest();
            }

            // Comprueba si se ha subido una nueva imagen de perfil
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file != null && file.Length > 0)
                {
                    // Guarde el contenido del archivo como bytes y actualice los bytes de la foto de perfil del usuario.
                    usuario.UsuProfilePhoto = await SaveProfileImage(file);
                }
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        private async Task<byte[]> SaveProfileImage(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }

        // Registrar un nuevo usuario
        // POST: api/Usuarios
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
          if (_context.Usuarios == null)
          {
              return Problem("Entity set 'WishlistContext.Usuarios'  is null.");
          }
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.UsuId }, usuario);
        }

        // Eliminar usuario
        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return (_context.Usuarios?.Any(e => e.UsuId == id)).GetValueOrDefault();
        }


        // Inactivar/eliminar usuario
        [HttpPut("Inactivar/{id}")]
        [Authorize]
        public async Task<IActionResult> InactivarUsuario(int id)
        {
            try
            {
                var usuario = await _context.Usuarios
                    .FirstOrDefaultAsync(a => a.UsuId == id && a.UsuEstatus == "A");

                if (usuario == null)
                {
                    return NotFound();
                }

                // Actualizar el campo UsuEstatus a "I" (inactivo)
                usuario.UsuEstatus = "I";

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Maneja excepciones según tus necesidades
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }


        // Activar usuario
        [HttpPut("Activar/{id}")]
        [Authorize]
        public async Task<IActionResult> ActivarUsuario(int id)
        {
            try
            {
                var usuario = await _context.Usuarios
                    .FirstOrDefaultAsync(a => a.UsuId == id && a.UsuEstatus == "I");

                if (usuario == null)
                {
                    return NotFound();
                }

                // Actualizar el campo UsuEstatus a "I" (inactivo)
                usuario.UsuEstatus = "A";

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Maneja excepciones según tus necesidades
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
    }
}
