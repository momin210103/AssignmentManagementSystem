using AMS.Application.Features.Admin.Subject.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Subject.Queries.GetAllSubjects;

public record GetAllSubjectsQuery() : IRequest<List<SubjectDto>>;