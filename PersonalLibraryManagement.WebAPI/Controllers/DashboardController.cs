using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Mvc;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.DTOs.Response;

namespace PersonalLibraryManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IDashboardService dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<Response> GetYearlyExpenses()
        {
            return await this.dashboardService.GetTotalYearlyExpenses();
        }

        [HttpGet]
        public async Task<Response> GetCategoryWiseExpenses()
        {
            return await this.dashboardService.GetTotalCategoryWiseExpenses();
        }
    }
}
