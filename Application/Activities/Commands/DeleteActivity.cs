using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext dbContext) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken) ?? throw new Exception("Cannot find the activity.");

                dbContext.Remove(activity);
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
