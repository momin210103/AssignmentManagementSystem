using System.Text.Json;
using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Models;

namespace AMS.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var statusCode = exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            BadRequestException => StatusCodes.Status400BadRequest,
            UnauthorizedException => StatusCodes.Status401Unauthorized,
            ForbiddenException => StatusCodes.Status403Forbidden,
            ValidationException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };
        context.Response.StatusCode = statusCode;
        ErrorResponse errorResponse;
        if (exception is ValidationException validationException)
        {
            errorResponse = new ErrorResponse
            {
                Success = false,
                Message = validationException.Message,
                Errors = validationException.Errors
            };
        }
        else
        {
            errorResponse = new ErrorResponse
            {
                Success = false,
                Message = exception.Message
            };
            
        }
        
        await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }
}