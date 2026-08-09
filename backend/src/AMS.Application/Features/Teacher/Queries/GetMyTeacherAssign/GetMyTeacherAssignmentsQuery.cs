using AMS.Application.Features.Teacher.DTOs;
using MediatR;

namespace AMS.Application.Features.Teacher.Queries.GetMyTeacherAssignments;

public record GetMyTeacherAssignmentsQuery
    : IRequest<List<TeacherAssignmentOptionDto>>;