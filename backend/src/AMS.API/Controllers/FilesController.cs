using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IFileStorageService _fileStorageService;

        public FilesController(
            IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(
        IFormFile? file,
        CancellationToken cancellationToken)
        {
            if (file is null || file.Length == 0)
            {
                return Ok(new
                {
                    fileUrl = (string?)null
                });
            }

            var fileUrl = await _fileStorageService.SaveAsync(
                file.OpenReadStream(),
                file.FileName,
                "submissions",
                cancellationToken);

            return Ok(new
            {
                fileUrl
            });
        }


    }
}