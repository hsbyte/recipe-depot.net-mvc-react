using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace RecipeDepot.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class VideoController : ControllerBase
	{
		//[HttpPost("{id}")]
		//public async Task<IActionResult> UploadVideo([FromRoute] string id, IFormFile file)
		//{
		//		return BadRequest();
		//}

		// DELETE: api/image/delete/{filefull path -> id}
		[HttpDelete("delete/{id}")]
		public IActionResult DeleteVideo([FromRoute] string id)
		{
			return Ok(new { status = "File deleted." });
		}
	}
}