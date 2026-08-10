using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Interfaces;

namespace AMS.Infrastructure.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly string _webRootPath;

        public FileStorageService(string webRootPath)
        {
            _webRootPath = webRootPath;
        }

        public Task DeleteAsync(string filePath, CancellationToken cancellationToken = default)
        {
            var fullPath = Path.Combine(
           _webRootPath,
           filePath.TrimStart('/'));

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }

            return Task.CompletedTask;
        }

        public async Task<string> SaveAsync(Stream fileStream, string fileName, string folder, CancellationToken cancellationToken = default)
        {
            var uploadFolder = Path.Combine(
            _webRootPath,
            "uploads",
            folder);

            Directory.CreateDirectory(uploadFolder);

            var extension = Path.GetExtension(fileName);

            var storedFileName =
                $"{Guid.NewGuid()}{extension}";

            var filePath = Path.Combine(
                uploadFolder,
                storedFileName);

            await using var outputStream =
                new FileStream(
                    filePath,
                    FileMode.Create);

            await fileStream.CopyToAsync(
                outputStream,
                cancellationToken);

            return $"/uploads/{folder}/{storedFileName}";
        }
    }
}