using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalLibraryManagement.Application.Identity;
using PersonalLibraryManagement.Application.Models.Identity;

namespace PersonalLibraryManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly IAuthService authService;

        public AccountController(IAuthService authService)
        {
            this.authService = authService;
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<RegistrationResponse> Register([FromBody] RegistrationRequest registrationRequest)
        {
            return await authService.Register(registrationRequest);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<AuthResponse> Login([FromBody] AuthRequest authRequest)
        {
            return await authService.Login(authRequest);
        }
    }
}
