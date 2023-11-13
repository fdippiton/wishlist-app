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

namespace wishlist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private readonly WishlistContext _context;

        public ArticulosController(WishlistContext context)
        {
            _context = context;
        }

        // GET: api/Articulos
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulos()
        {
            try
            {
                if (_context.Articulos == null)
                {
                    return NotFound();
                }

                var articulos = await _context.Articulos
                    .Include(x => x.ArtLisReg!.LisRegLisPriv)
                    .Include(x => x.ArtLisReg!.LisRegUsuario)
                    .Include(x => x.ArtRegEstatus)
                    .ToListAsync();

                // Configura las opciones de serialización para manejar referencias circulares
                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    MaxDepth = 64, // Ajusta según sea necesario para la profundidad de tu objeto

                };

                // Serializa los datos utilizando las opciones configuradas
                var jsonResult = JsonSerializer.Serialize(articulos, options);

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

        // GET: api/Articulos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Articulo>> GetArticulo(int id)
        {
          if (_context.Articulos == null)
          {
              return NotFound();
          }
            var articulo = await _context.Articulos.FindAsync(id);

            if (articulo == null)
            {
                return NotFound();
            }

            return articulo;
        }

        // PUT: api/Articulos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticulo(int id, Articulo articulo)
        {
            if (id != articulo.ArtId)
            {
                return BadRequest();
            }

            _context.Entry(articulo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticuloExists(id))
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

        // POST: api/Articulos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Articulo>> PostArticulo(Articulo articulo)
        {
          if (_context.Articulos == null)
          {
              return Problem("Entity set 'WishlistContext.Articulos'  is null.");
          }
            _context.Articulos.Add(articulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticulo", new { id = articulo.ArtId }, articulo);
        }

        // DELETE: api/Articulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticulo(int id)
        {
            if (_context.Articulos == null)
            {
                return NotFound();
            }
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo == null)
            {
                return NotFound();
            }

            _context.Articulos.Remove(articulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticuloExists(int id)
        {
            return (_context.Articulos?.Any(e => e.ArtId == id)).GetValueOrDefault();
        }
    }
}
