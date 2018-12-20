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
    public class MainIngredientsController : ControllerBase
    {
        private readonly RecipeDepotContext _context;

        public MainIngredientsController(RecipeDepotContext context)
        {
            _context = context;
        }

        // GET: api/MainIngredients
        [HttpGet]
        public IEnumerable<MainIngredient> GetMainIngredients()
        {
            return _context.MainIngredients;
        }

        // GET: api/MainIngredients/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMainIngredient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mainIngredient = await _context.MainIngredients.FindAsync(id);

            if (mainIngredient == null)
            {
                return NotFound();
            }

            return Ok(mainIngredient);
        }

        // PUT: api/MainIngredients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMainIngredient([FromRoute] int id, [FromBody] MainIngredient mainIngredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mainIngredient.Id)
            {
                return BadRequest();
            }

            _context.Entry(mainIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MainIngredientExists(id))
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

        // POST: api/MainIngredients
        [HttpPost]
        public async Task<IActionResult> PostMainIngredient([FromBody] MainIngredient mainIngredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MainIngredients.Add(mainIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMainIngredient", new { id = mainIngredient.Id }, mainIngredient);
        }

        // DELETE: api/MainIngredients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMainIngredient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mainIngredient = await _context.MainIngredients.FindAsync(id);
            if (mainIngredient == null)
            {
                return NotFound();
            }

            _context.MainIngredients.Remove(mainIngredient);
            await _context.SaveChangesAsync();

            return Ok(mainIngredient);
        }

        private bool MainIngredientExists(int id)
        {
            return _context.MainIngredients.Any(e => e.Id == id);
        }
    }
}