using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Application.Activities.Queries
{
    public class GetActivityDetail
    {
        public class Query : IRequest<Result<Activity>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Result<Activity>>
        {
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken);

                if (activity == null) return Result<Activity>.Failure("Activity not found", 404);

                return Result<Activity>.Success(activity);
            }
        }
    }
}
