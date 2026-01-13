using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities.Queries
{
    public class GetActivitiyList
    {
        public class Query : IRequest<List<Activity>> {}

        public class Handler(AppDbContext dbContext) : IRequestHandler<Query, List<Activity>>
        {
            public async Task<List<Activity>> Handle(Query resquest, CancellationToken cancellationToken)
            {
                return await dbContext.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
