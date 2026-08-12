using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Commands.RemoveStudentFromClass
{
    public class RemoveStudentFromClassCommandHandler
    : IRequestHandler<
        RemoveStudentFromClassCommand,
        RemoveStudentFromClassResponse>
    {
        private readonly IApplicationDbContext _context;

        public RemoveStudentFromClassCommandHandler(
            IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RemoveStudentFromClassResponse> Handle(
            RemoveStudentFromClassCommand request,
            CancellationToken cancellationToken)
        {
            var studentClass = await _context.StudentClasses
                .FirstOrDefaultAsync(
                    x =>
                        x.ClassId == request.ClassId &&
                        x.StudentId == request.StudentId,
                    cancellationToken);

            if (studentClass is null)
            {
                throw new NotFoundException(
                    "Student is not assigned to this class.");
            }

            _context.StudentClasses.Remove(studentClass);

            await _context.SaveChangesAsync(cancellationToken);

            return new RemoveStudentFromClassResponse
            {
                Message = "Student removed from class successfully."
            };
        }
    }
}