using FluentValidation.Results;

namespace AMS.Application.Common.Exceptions;

public class ValidationException : Exception
{
    public List<string> Errors { get; }
    public ValidationException(IEnumerable<ValidationFailure> failures) : base ("Validation failed.")
    {
        Errors = failures
            .Select(x => x.ErrorMessage)
            .ToList();
    }
    
}