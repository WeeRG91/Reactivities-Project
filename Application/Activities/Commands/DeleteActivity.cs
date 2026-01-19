using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken);

                if (activity == null) return Result<Unit>.Failure("Activity not found.", 404);

                dbContext.Remove(activity);

                var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the activity.", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
