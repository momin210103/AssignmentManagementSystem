using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Commands.DeleteClassCommands
{
    public class DeleteClassCommandHandler : IRequestHandler<DeleteClassCommand, DeleteClassCommandResponse>
    {
        private readonly IApplicationDbContext _context;

        public DeleteClassCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DeleteClassCommandResponse> Handle(DeleteClassCommand request, CancellationToken cancellationToken)
        {
            //Implement the logic to delete the class from the database using the provided ClassId
            // For example, you can use the IApplicationDbContext to access the database and delete the class entity.
            var classToDelete = await _context.ClassRooms.FindAsync(request.ClassId, cancellationToken);
            if (classToDelete == null)
                throw new NotFoundException("Class not found.");

            _context.ClassRooms.Remove(classToDelete);
            await _context.SaveChangesAsync(cancellationToken);

            return new DeleteClassCommandResponse
            {
                Message = "Class deleted successfully."
            };
        }
    }
}