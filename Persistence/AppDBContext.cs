using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    public DbSet<Activity> Activities { get; set; }
}
