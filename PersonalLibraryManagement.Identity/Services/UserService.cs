using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using PersonalLibraryManagement.Application.Identity;
using PersonalLibraryManagement.Application.Models.Identity;
using PersonalLibraryManagment.Infrastructure.Identity.Models;
using System.Security.Claims;

namespace PersonalLibraryManagment.Infrastructure.Identity.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public string UserId { get => _httpContextAccessor.HttpContext?.User.FindFirstValue("uid"); }

        public async Task<User> GetUser(string UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId);

            return new User
            {
                Email = user.Email,
                Id = user.Id,
                DisplayName = user.DisplayName,
            };
        }

        public async Task<List<User>> GetUsers()
        {
            var employees = await _userManager.GetUsersInRoleAsync("Employee");
            return employees.Select(q => new User
            {
                Id = q.Id,
                Email = q.Email,
                DisplayName = q.DisplayName,
            }).ToList();

        }
    }
}
