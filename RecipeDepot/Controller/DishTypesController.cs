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
    public class DishTypesController : ControllerBase
    {
        private readonly RecipeDepotContext _context;

        public DishTypesController(RecipeDepotContext context)
        {
            _context = context;
        }

        // GET: api/DishTypes
        [HttpGet]
        public IEnumerable<DishType> GetDishTypes()
        {
            return _context.DishTypes;
        }

        // GET: api/DishTypes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDishType([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dishType = await _context.DishTypes.FindAsync(id);

            if (dishType == null)
            {
                return NotFound();
            }

            return Ok(dishType);
        }

        // PUT: api/DishTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishType([FromRoute] int id, [FromBody] DishType dishType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dishType.Id)
            {
                return BadRequest();
            }

            _context.Entry(dishType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishTypeExists(id))
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

        // POST: api/DishTypes
        [HttpPost]
        public async Task<IActionResult> PostDishType([FromBody] DishType dishType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DishTypes.Add(dishType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDishType", new { id = dishType.Id }, dishType);
        }

        // DELETE: api/DishTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDishType([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dishType = await _context.DishTypes.FindAsync(id);
            if (dishType == null)
            {
                return NotFound();
            }

            _context.DishTypes.Remove(dishType);
            await _context.SaveChangesAsync();

            return Ok(dishType);
        }

        private bool DishTypeExists(int id)
        {
            return _context.DishTypes.Any(e => e.Id == id);
        }
    }
}