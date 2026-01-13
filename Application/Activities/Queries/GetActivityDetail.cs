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
        public class Query : IRequest<Activity>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Activity>
        {
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken) ?? throw new Exception("Activity not found.");

                return activity;
            }
        }
    }
}
