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
using Microsoft.Extensions.Options;

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

        // Obtener las listaRegalos de un usuario especifico
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
                    .Where(lista => lista.LisRegEstatus == "A")
                    .Select(lista => new ListaRegaloViewModel 
                    {
                        LisRegId = lista.LisRegId,
                        LisRegNombre = lista.LisRegNombre,
                        LisRegFecCreacion = lista.LisRegFecCreacion,
                        LisRegUsuarioId = lista.LisRegUsuarioId,
                        LisRegUsuario = lista.LisRegUsuario.UsuNombre,
                        LisRegUsuarioApellido = lista.LisRegUsuario.UsuApellidos,
                        LisRegUsuarioRolId = lista.LisRegUsuario.UsuRol,
                        LisRegUsuarioRol = lista.LisRegUsuario.UsuRolNavigation.RolNombre,
                        LisRegLisPrivId = lista.LisRegLisPrivId,
                        LisRegLisPriv = lista.LisRegLisPriv.LisPrivPrivacidad,
                        LisRegEstatus = lista.LisRegEstatus
                    })
                    .ToListAsync();

                // Configura las opciones de serialización para manejar referencias circulares
                //var options = new JsonSerializerOptions
                //{
                //    ReferenceHandler = ReferenceHandler.Preserve,
                //    MaxDepth = 10, // Ajusta según sea necesario para la profundidad de tu objeto

                //};

                // Serializa los datos utilizando las opciones configuradas
                var jsonResult = JsonSerializer.Serialize(listaRegalos);

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

        // Obtener las listaRegalos publicas de un usuario especifico 
        // GET: api/ListaRegalos
        [HttpGet("listasUsuario/{userId}")]
        public async Task<ActionResult<IEnumerable<ListaRegalo>>> GetListaRegalosPublicas(int userId)
        {
            try
            {
                if (_context.ListaRegalos == null)
                {
                    return NotFound();
                }

                var listaRegalos = await _context.ListaRegalos
                    .Include(x => x.LisRegUsuario)
                    .Include(x => x.LisRegLisPriv)
                    .Where(lista => lista.LisRegUsuarioId == userId)
                    .Where(lista => lista.LisRegEstatus == "A")
                    .Where(lista => lista.LisRegLisPrivId == 1)
                    .Select(lista => new ListaRegaloViewModel
                    {
                        LisRegId = lista.LisRegId,
                        LisRegNombre = lista.LisRegNombre,
                        LisRegFecCreacion = lista.LisRegFecCreacion,
                        LisRegUsuarioId = lista.LisRegUsuarioId,
                        LisRegUsuario = lista.LisRegUsuario.UsuNombre,
                        LisRegUsuarioApellido = lista.LisRegUsuario.UsuApellidos,
                        LisRegUsuarioRolId = lista.LisRegUsuario.UsuRol,
                        LisRegUsuarioRol = lista.LisRegUsuario.UsuRolNavigation.RolNombre,
                        LisRegLisPrivId = lista.LisRegLisPrivId,
                        LisRegLisPriv = lista.LisRegLisPriv.LisPrivPrivacidad,
                        LisRegEstatus = lista.LisRegEstatus
                    })
                    .ToListAsync();

                // Configura las opciones de serialización para manejar referencias circulares
                //var options = new JsonSerializerOptions
                //{
                //    ReferenceHandler = ReferenceHandler.Preserve,
                //    MaxDepth = 10, // Ajusta según sea necesario para la profundidad de tu objeto

                //};

                // Serializa los datos utilizando las opciones configuradas
                var jsonResult = JsonSerializer.Serialize(listaRegalos);

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

        // Obtener todas las listas de regalos publicas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListaRegalo>>> GetListaRegalos()
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
                    .Where(lista => lista.LisRegLisPrivId == 1)
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
        [HttpGet("ById/{id}")]
        public async Task<ActionResult<ListaRegalo>> GetListaRegalo(int id)
        {
            if (_context.ListaRegalos == null)
            {
                return NotFound();
            }
            var listaRegalo = await _context.ListaRegalos
                .Include(x => x.LisRegUsuario!.UsuRolNavigation)
                .Include(x => x.LisRegLisPriv)
                .Where(lista => lista.LisRegId == id)
                .Select(lista => new ListaRegaloViewModel
                    {
                        LisRegId = lista.LisRegId,
                        LisRegNombre = lista.LisRegNombre,
                        LisRegFecCreacion = lista.LisRegFecCreacion,
                        LisRegUsuarioId = lista.LisRegUsuarioId,
                        LisRegUsuario = lista.LisRegUsuario.UsuNombre,
                        LisRegUsuarioApellido = lista.LisRegUsuario.UsuApellidos,
                        LisRegUsuarioRolId = lista.LisRegUsuario.UsuRol,
                        LisRegUsuarioRol = lista.LisRegUsuario.UsuRolNavigation.RolNombre,
                        LisRegLisPrivId = lista.LisRegLisPrivId,
                        LisRegLisPriv = lista.LisRegLisPriv.LisPrivPrivacidad,
                        LisRegEstatus = lista.LisRegEstatus
                    })
                .FirstOrDefaultAsync();

            if (listaRegalo == null)
            {
                return NotFound();
            }

            var jsonResult = JsonSerializer.Serialize(listaRegalo);

            // Devuelve el resultado serializado
            return Content(jsonResult, "application/json");

           
        }

        // PUT: api/ListaRegalos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
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


        [HttpPut("Inactivar/{id}")]
        [Authorize]
        public async Task<IActionResult> InactivarLista(int id)
        {
            try
            {
                var articulo = await _context.ListaRegalos
                    .FirstOrDefaultAsync(a => a.LisRegId == id && a.LisRegEstatus == "A");

                if (articulo == null)
                {
                    return NotFound();
                }

                // Actualizar el campo LisRegEstatus a "I" (inactivo)
                articulo.LisRegEstatus = "I";

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
