using PersonalLibraryManagement.Application.DTOs.Response;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IDashboardService
    {
        Task<Response> GetTotalYearlyExpenses();
        Task<Response> GetTotalCategoryWiseExpenses();
    }
}
