using System;
using System.Collections.Generic;
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
    public class RegaloEstatusController : ControllerBase
    {
        private readonly WishlistContext _context;

        public RegaloEstatusController(WishlistContext context)
        {
            _context = context;
        }

        // GET: api/RegaloEstatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegaloEstatus>>> GetRegaloEstatuses()
        {
          if (_context.RegaloEstatuses == null)
          {
              return NotFound();
          }
            return await _context.RegaloEstatuses.ToListAsync();
        }

        // GET: api/RegaloEstatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegaloEstatus>> GetRegaloEstatus(int id)
        {
          if (_context.RegaloEstatuses == null)
          {
              return NotFound();
          }
            var regaloEstatus = await _context.RegaloEstatuses.FindAsync(id);

            if (regaloEstatus == null)
            {
                return NotFound();
            }

            return regaloEstatus;
        }

        // PUT: api/RegaloEstatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegaloEstatus(int id, RegaloEstatus regaloEstatus)
        {
            if (id != regaloEstatus.RegEstatusId)
            {
                return BadRequest();
            }

            _context.Entry(regaloEstatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegaloEstatusExists(id))
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

        // POST: api/RegaloEstatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegaloEstatus>> PostRegaloEstatus(RegaloEstatus regaloEstatus)
        {
          if (_context.RegaloEstatuses == null)
          {
              return Problem("Entity set 'WishlistContext.RegaloEstatuses'  is null.");
          }
            _context.RegaloEstatuses.Add(regaloEstatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegaloEstatus", new { id = regaloEstatus.RegEstatusId }, regaloEstatus);
        }

        // DELETE: api/RegaloEstatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegaloEstatus(int id)
        {
            if (_context.RegaloEstatuses == null)
            {
                return NotFound();
            }
            var regaloEstatus = await _context.RegaloEstatuses.FindAsync(id);
            if (regaloEstatus == null)
            {
                return NotFound();
            }

            _context.RegaloEstatuses.Remove(regaloEstatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegaloEstatusExists(int id)
        {
            return (_context.RegaloEstatuses?.Any(e => e.RegEstatusId == id)).GetValueOrDefault();
        }
    }
}
