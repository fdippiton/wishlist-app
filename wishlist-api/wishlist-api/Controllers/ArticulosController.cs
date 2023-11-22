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
    public class ArticulosController : ControllerBase
    {
        private readonly WishlistContext _context;

        public ArticulosController(WishlistContext context)
        {
            _context = context;
        }

        // GET: api/Articulos
        // Obtener los articulos pertenecientes a una lista especifica
        [HttpGet("ByList/{listId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulos(int listId)
        {
            try
            {
                if (_context.Articulos == null)
                {
                    return NotFound();
                }

                var articulos = await _context.Articulos
                    .Include(x => x.ArtLisReg)
                    .Include(x => x.ArtRegEstatus)
                    .Where(art => art.ArtLisRegId == listId && art.ArtEstatus == "A")
                    .Select(articulo => new ArticulosViewModel
                    {
                        ArtId = articulo.ArtId,
                        ArtNombre = articulo.ArtNombre,
                        ArtUrl = articulo.ArtUrl,
                        ArtLisRegId = articulo.ArtLisRegId,
                        ArtLisRegNombre = articulo.ArtLisReg.LisRegNombre,
                        ArtPrioridad = articulo.ArtPrioridad,
                        ArtRegEstatusId = articulo.ArtRegEstatusId,
                        ArtRegStatus = articulo.ArtRegEstatus.RegEstatus,
                        ArtEstatus = articulo.ArtEstatus,
                    })
                    .ToListAsync();

                // Serializa los datos utilizando las opciones configuradas
                var jsonResult = JsonSerializer.Serialize(articulos);

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


        // Obtener todos los articulos
        [HttpGet]
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





        //GET: api/Articulos/5
        [HttpGet("{id}")]
        [Authorize]
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
        [Authorize]
        public async Task<IActionResult> PutArticulo(int id, [FromBody] Articulo articulo)
        {
            try
            {
                if (id != articulo.ArtId)
                {
                    return BadRequest("The provided ID in the URL does not match the ID in the request body.");
                }

                _context.Entry(articulo).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticuloExists(id))
                {
                    return NotFound($"Articulo with ID {id} not found.");
                }
                else
                {
                    return StatusCode(500, "An error occurred while updating the Articulo.");
                }
            }
            catch 
            {
                // Log the exception for debugging purposes
                // logger.LogError($"An error occurred: {ex}");

                return StatusCode(500, "An unexpected error occurred while processing the request.");
            }
        }

        // POST: api/Articulos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Articulo>> PostArticulo(Articulo articulo)
        {

            try
            {
                if (_context.Articulos == null)
                {
                    return Problem("Entity set 'WishlistContext.Articulos' is null.");
                }

                _context.Articulos.Add(articulo);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetArticulo", new { id = articulo.ArtId }, articulo);
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

        [HttpPut("Inactivar/{id}")]
        [Authorize]
        public async Task<IActionResult> InactivarArticulo(int id)
        {
            try
            {
                var articulo = await _context.Articulos
                    .FirstOrDefaultAsync(a => a.ArtId == id && a.ArtEstatus == "A");

                if (articulo == null)
                {
                    return NotFound();
                }

                // Actualizar el campo ArtEstatus a "I" (inactivo)
                articulo.ArtEstatus = "I";

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
