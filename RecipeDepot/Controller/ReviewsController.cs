﻿using System;
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
	public class ReviewsController : ControllerBase
	{
		private readonly RecipeDepotContext _context;

		public ReviewsController(RecipeDepotContext context)
		{
			_context = context;
		}

		// GET: api/Reviews
		[HttpGet]
		public IEnumerable<Review> GetReviews()
		{
			return _context.Reviews;
		}

		// GET: api/Reviews/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetReview([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var review = await _context.Reviews.FindAsync(id);

			if (review == null)
			{
				return NotFound();
			}

			return Ok(review);
		}

		// PUT: api/Reviews/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutReview([FromRoute] int id, [FromBody] Review review)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != review.Id)
			{
				return BadRequest();
			}

			_context.Entry(review).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!ReviewExists(id))
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

		// POST: api/Reviews/post
				[HttpPost("post")]
        public async Task<IActionResult> PostReview([FromBody] Review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }
}