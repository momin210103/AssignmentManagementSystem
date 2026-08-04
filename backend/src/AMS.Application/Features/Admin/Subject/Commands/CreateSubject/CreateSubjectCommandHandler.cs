using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Subject.Commands.CreateSubject;
using AMS.Domain.Entities;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Subjects.Commands.CreateSubject;

public class CreateSubjectCommandHandler
    : IRequestHandler<CreateSubjectCommand, CreateSubjectResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreateSubjectCommandHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CreateSubjectResponse> Handle(
        CreateSubjectCommand request,
        CancellationToken cancellationToken)
    {
        // Check duplicate subject name
        var exists = await _context.Subjects
            .AnyAsync(
                x => x.Name.ToLower() == request.Request.Name.Trim().ToLower(),
                cancellationToken);

        if (exists)
            throw new Exception("Subject already exists.");

        // Map Request -> Entity
        var subject = _mapper.Map<Domain.Entities.Subject>(request.Request);
        subject.Id = Guid.NewGuid();

        // Save
        await _context.Subjects.AddAsync(subject, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return new CreateSubjectResponse
        {
            Id = subject.Id,
            Message = "Subject created successfully."
        };
    }
}