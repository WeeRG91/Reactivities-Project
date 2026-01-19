using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities.Validators
{
    public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDTO>
    {
        public CreateActivityValidator() : base(x => x.ActivityDto)
        { 
        }
    }
}
