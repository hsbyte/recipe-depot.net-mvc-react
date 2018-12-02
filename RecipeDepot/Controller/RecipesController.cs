using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeDepot.Models.Recipes;
using RecipeDepotData;
using RecipeDepotData.Models;

namespace RecipeDepot.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeDepotContext _context;

        public RecipesController(RecipeDepotContext context)
        {
            _context = context;
        }

       // GET: api/Recipes
        [HttpGet]
        public IEnumerable<RecipeIndexListModel> GetRecipes()
        {
            return GetAllRecipeAssets(_context.Recipes
                    .Include(asset => asset.Patron)
                    .Include(asset => asset.Ingredients)
                    .Include(asset => asset.Reviews)
                        .ThenInclude(asset => asset.Patron));
        }

        private IEnumerable<RecipeIndexListModel> GetAllRecipeAssets(IEnumerable<Recipe> assetModels)
        {
            return assetModels
                .Select(asset => new RecipeIndexListModel
                {
                    Id = asset.Id,
                    Shared = asset.Shared,
                    Title = asset.Title,
                    Description = asset.Description,
                    Steps = asset.Steps,
                    ImageUrl = asset.ImageUrl,
                    CookTime = asset.CookTime,
                    PrepTime = asset.PrepTime,
                    DishType = asset.DishType,
                    MainIngredient = asset.MainIngredient,
                    Seasons = asset.Seasons,
                    Name = asset.Patron.FirstName + ' ' + asset.Patron.LastName,
                    Ingredients = asset.Ingredients,
                    Reviews = asset.Reviews
                });
        }

        private IEnumerable<Recipe> GetAll()
        {
            return _context.Recipes
                    .Include(asset => asset.Patron)
                    .Include(asset => asset.Ingredients)
                    .Include(asset => asset.Reviews)
                        .ThenInclude(asset => asset.Patron);
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipe([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var recipe = await _context.Recipes.FindAsync(id);
            var recipe = await _context.Recipes
                        .Include(asset => asset.Patron)
                        .Include(asset => asset.Ingredients)
                        .Include(asset => asset.Reviews)
                            .ThenInclude(asset => asset.Patron)
                        .FirstOrDefaultAsync(asset => asset.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }

        // PUT: api/Recipes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe([FromRoute] int id, [FromBody] Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
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

        // POST: api/Recipes
        [HttpPost]
        public async Task<IActionResult> PostRecipe([FromBody] Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return Ok(recipe);
        }

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}