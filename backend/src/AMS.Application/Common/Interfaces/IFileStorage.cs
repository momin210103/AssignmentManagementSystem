namespace AMS.Application.Common.Interfaces;

public interface IFileStorageService
{
    Task<string> SaveAsync(
        Stream fileStream,
        string fileName,
        string folder,
        CancellationToken cancellationToken = default);

    Task DeleteAsync(
        string filePath,
        CancellationToken cancellationToken = default);
}