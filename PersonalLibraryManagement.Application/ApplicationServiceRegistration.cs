using Microsoft.Extensions.DependencyInjection;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.Services;
using System.Reflection;

namespace PersonalLibraryManagement.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IDashboardService, DashboardService>();

            return services;
        }
    }
}
