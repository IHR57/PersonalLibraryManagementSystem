using Microsoft.EntityFrameworkCore;
using PersonalLibraryManagement.Domain.Entities;
using PersonalLibraryManagement.Domain.Entities.Base;

namespace PersonalLibraryManagement.Infrastructure.Persistence.DatabaseContext
{
    public class PersonalLibraryDatabaseContext : DbContext
    {
        public PersonalLibraryDatabaseContext(DbContextOptions<PersonalLibraryDatabaseContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PersonalLibraryDatabaseContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in base.ChangeTracker.Entries<BaseEntity>()
                .Where(q => q.State == EntityState.Added || q.State == EntityState.Modified))
            {
                entry.Entity.LastUpdatedDate = DateTime.Now;
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = DateTime.Now;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}

