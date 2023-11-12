using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wishlist_api.Models;

namespace wishlist_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaPrivacidadController : ControllerBase
    {
        private readonly WishlistContext _context;

        public ListaPrivacidadController(WishlistContext context)
        {
            _context = context;
        }

        // GET: api/ListaPrivacidad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListaPrivacidad>>> GetListaPrivacidads()
        {
          if (_context.ListaPrivacidads == null)
          {
              return NotFound();
          }
            return await _context.ListaPrivacidads.ToListAsync();
        }

        // GET: api/ListaPrivacidad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListaPrivacidad>> GetListaPrivacidad(int id)
        {
          if (_context.ListaPrivacidads == null)
          {
              return NotFound();
          }
            var listaPrivacidad = await _context.ListaPrivacidads.FindAsync(id);

            if (listaPrivacidad == null)
            {
                return NotFound();
            }

            return listaPrivacidad;
        }

        // PUT: api/ListaPrivacidad/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListaPrivacidad(int id, ListaPrivacidad listaPrivacidad)
        {
            if (id != listaPrivacidad.LisPrivId)
            {
                return BadRequest();
            }

            _context.Entry(listaPrivacidad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListaPrivacidadExists(id))
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

        // POST: api/ListaPrivacidad
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ListaPrivacidad>> PostListaPrivacidad([FromBody] ListaPrivacidad listaPrivacidad)
        {
            try
            {
                if (_context.ListaPrivacidads == null)
                {
                    return Problem("Entity set 'WishlistContext.ListaPrivacidads' is null.");
                }

                _context.ListaPrivacidads.Add(listaPrivacidad);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetListaPrivacidad", new { id = listaPrivacidad.LisPrivId }, listaPrivacidad);
            }
            catch (Exception ex)
            {
                // Registra la excepción para obtener más detalles en los registros
                Console.WriteLine($"Error al realizar la operación POST: {ex}");

                // Registra la excepción interna si está presente
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException}");
                }

                // Devuelve un error interno del servidor con un mensaje personalizado
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // DELETE: api/ListaPrivacidad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListaPrivacidad(int id)
        {
            if (_context.ListaPrivacidads == null)
            {
                return NotFound();
            }
            var listaPrivacidad = await _context.ListaPrivacidads.FindAsync(id);
            if (listaPrivacidad == null)
            {
                return NotFound();
            }

            _context.ListaPrivacidads.Remove(listaPrivacidad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListaPrivacidadExists(int id)
        {
            return (_context.ListaPrivacidads?.Any(e => e.LisPrivId == id)).GetValueOrDefault();
        }
    }
}
