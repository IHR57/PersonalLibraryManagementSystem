using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalLibraryManagment.Infrastructure.Identity.Models;

namespace PersonalLibraryManagment.Infrastructure.Identity.DbContext
{
    public class LibraryManagementIdentityDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public LibraryManagementIdentityDbContext(DbContextOptions<LibraryManagementIdentityDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(typeof(LibraryManagementIdentityDbContext).Assembly);
        }
    }
}
