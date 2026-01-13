using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(AppDbContext dbContext) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                dbContext.Activities.Add(request.Activity);
                await dbContext.SaveChangesAsync(cancellationToken);

                return request.Activity.Id;
            }
        }
    }
}
