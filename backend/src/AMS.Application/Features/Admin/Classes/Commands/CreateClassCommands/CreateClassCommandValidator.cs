using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace AMS.Application.Features.Admin.Classes.Commands.CreateClassCommands
{
    public class CreateClassCommandValidator : AbstractValidator<CreateClassCommand>
    {
        public CreateClassCommandValidator()
        {
            RuleFor(x => x.Request.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Request.Section)
                .NotEmpty()
                .MaximumLength(10);
        }

    }
}