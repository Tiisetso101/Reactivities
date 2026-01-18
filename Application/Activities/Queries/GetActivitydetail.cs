using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities.Queries
{
    public class GetActivityDetail
    {
        public class Query : IRequest<Activity>
        {
            public required  string Id { get; set; }
        }

        public class Handler(AppDBContext context) : IRequestHandler<Query, Activity>
        {

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (activity == null) throw new Exception("Activity not found");

                return activity;
            }
        }
    }
}