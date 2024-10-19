using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Application.DTOs.Response;

namespace PersonalLibraryManagement.Application.Services
{
    internal class DashboardService : IDashboardService
    {
        private readonly IBookRepository bookRepository;

        public DashboardService(IBookRepository bookRepository)
        {
            this.bookRepository = bookRepository;
        }

        public Task<Response> GetTotalCategoryWiseExpenses()
        {
            return this.bookRepository.GetTotalCategoryWiseExpenses();
        }

        public Task<Response> GetTotalYearlyExpenses()
        {
            return this.bookRepository.GetYearlyTotalExpenses();
        }
    }
}
