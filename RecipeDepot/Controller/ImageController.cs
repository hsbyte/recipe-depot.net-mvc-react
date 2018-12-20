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
	public class ImageController : ControllerBase
	{
		[HttpPost("{id}")]
		public async Task<IActionResult> UploadImage([FromRoute] string id, IFormFile file)
		{
			try
			{
				if (file == null || file.Length == 0)
				{
					return Content("file not selected");
				}
				//ClientApp/public/..
				var path = Path.Combine(
										Directory.GetCurrentDirectory(), "ClientApp/public/img/" + id,
										Path.GetFileName(file.FileName));
				using (FileStream stream = new FileStream(path, FileMode.Create))
				{
					await file.CopyToAsync(stream);
					//stream.Close();
				}
				return Ok(new { length = file.Length, name = file.FileName, fullPath = Path.GetFullPath(file.FileName) });
			}
			catch
			{
				return BadRequest();
			}
		}

		// DELETE: api/image/delete/{filefull path -> id}
		[HttpDelete("delete/{id}")]
		public IActionResult DeleteImage([FromRoute] string id)
		{
			string correctPath = id.Replace("=", "/");
			//ClientApp/public/..
			var path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/public" + correctPath);
			try
			{
				if (System.IO.File.Exists(path))
				{
					System.IO.File.Delete(path);
				}
			}
			catch
			{
				return Ok(new { status = "File not deleted." });
			}
			return Ok(new { status = "File deleted." });
		}
	}
}