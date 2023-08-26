using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Infrastructure.Persistence.DatabaseContext;
using PersonalLibraryManagement.Persistence.Repositories;

namespace PersonalLibraryManagement.Infrastructure.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<PersonalLibraryDatabaseContext>(options => options.UseSqlServer(
                configuration.GetConnectionString("PersonalLibraryManagmentConnectionString")));

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IBookRepository, BookRepository>();

            return services;
        }
    }
}
