using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeDepotData;
using RecipeDepotData.Models;

namespace RecipeDepot.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatronsController : ControllerBase
    {
        private readonly RecipeDepotContext _context;

        public PatronsController(RecipeDepotContext context)
        {
            _context = context;
        }

        // GET: api/Patrons
        [HttpGet]
        public IEnumerable<Patron> GetPatrons()
        {
            return _context.Patrons;
        }

        // GET: api/Patrons/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatron([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var patron = await _context.Patrons.FindAsync(id);

            if (patron == null)
            {
                return NotFound();
            }

            return Ok(patron);
        }

        // PUT: api/Patrons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatron([FromRoute] int id, [FromBody] Patron patron)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patron.Id)
            {
                return BadRequest();
            }

            _context.Entry(patron).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatronExists(id))
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

        // POST: api/Patrons
        [HttpPost]
        public async Task<IActionResult> PostPatron([FromBody] Patron patron)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Patrons.Add(patron);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatron", new { id = patron.Id }, patron);
        }

        // DELETE: api/Patrons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatron([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var patron = await _context.Patrons.FindAsync(id);
            if (patron == null)
            {
                return NotFound();
            }

            _context.Patrons.Remove(patron);
            await _context.SaveChangesAsync();

            return Ok(patron);
        }

        private bool PatronExists(int id)
        {
            return _context.Patrons.Any(e => e.Id == id);
        }
    }
}