using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;
using Domain;

namespace Application.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDBContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new KeyNotFoundException("Activity not found");
                }

                context.Activities.Remove(activity);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}