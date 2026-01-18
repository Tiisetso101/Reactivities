using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Commands
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }
      
        public class Handler (AppDBContext context, IMapper mapper) : IRequestHandler<Command>
        {
            

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.Id);

                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }

                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);

               
            }
        }
    }
}