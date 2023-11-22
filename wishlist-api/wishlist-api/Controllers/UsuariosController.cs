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

                // Apply search filter if a search query is provided
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
                
                // return Ok(usuarios);
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

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.UsuId)
            {
                return BadRequest();
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
    }
}
