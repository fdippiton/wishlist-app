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
    public class ListaRegalosController : ControllerBase
    {
        private readonly WishlistContext _context;

        public ListaRegalosController(WishlistContext context)
        {
            _context = context;
        }

        // GET: api/ListaRegalos
        [HttpGet("{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ListaRegalo>>> GetListaRegalos(int userId)
        {
            try
            {
                if (_context.ListaRegalos == null)
                {
                    return NotFound();
                }

                var listaRegalos = await _context.ListaRegalos
                    .Include(x => x.LisRegUsuario!.UsuRolNavigation)
                    .Include(x => x.LisRegLisPriv)
                    .Where(lista => lista.LisRegUsuarioId == userId)
                    .ToListAsync();

                // Configura las opciones de serialización para manejar referencias circulares
                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    MaxDepth = 64, // Ajusta según sea necesario para la profundidad de tu objeto

                };

                // Serializa los datos utilizando las opciones configuradas
                var jsonResult = JsonSerializer.Serialize(listaRegalos, options);

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

        // GET: api/ListaRegalos/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ListaRegalo>> GetListaRegalo(int id)
        //{
        //  if (_context.ListaRegalos == null)
        //  {
        //      return NotFound();
        //  }
        //    var listaRegalo = await _context.ListaRegalos.FindAsync(id);

        //    if (listaRegalo == null)
        //    {
        //        return NotFound();
        //    }

        //    return listaRegalo;
        //}

        // PUT: api/ListaRegalos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListaRegalo(int id, ListaRegalo listaRegalo)
        {
            if (id != listaRegalo.LisRegId)
            {
                return BadRequest();
            }

            _context.Entry(listaRegalo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListaRegaloExists(id))
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

        // POST: api/ListaRegalos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ListaRegalo>> PostListaRegalo(ListaRegalo listaRegalo)
        {

            try
            {
                if (_context.ListaRegalos == null)
                {
                    return Problem("Entity set 'WishlistContext.ListaRegalos' is null.");
                }

                _context.ListaRegalos.Add(listaRegalo);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetListaRegalo", new { id = listaRegalo.LisRegId }, listaRegalo);
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

        // DELETE: api/ListaRegalos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListaRegalo(int id)
        {
            if (_context.ListaRegalos == null)
            {
                return NotFound();
            }
            var listaRegalo = await _context.ListaRegalos.FindAsync(id);
            if (listaRegalo == null)
            {
                return NotFound();
            }

            _context.ListaRegalos.Remove(listaRegalo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListaRegaloExists(int id)
        {
            return (_context.ListaRegalos?.Any(e => e.LisRegId == id)).GetValueOrDefault();
        }
    }
}
