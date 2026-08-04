using AMS.Application.Features.Admin.TeacherAssign.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.TeacherAssign.Queries.GetAllTeacherAssign;

public record GetAllTeacherAssignQuery
    : IRequest<List<TeacherAssignDto>>;