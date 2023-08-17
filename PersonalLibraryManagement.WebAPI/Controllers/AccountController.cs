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
        private readonly ILogger<AccountController> logger;

        public AccountController(IAuthService authService, ILogger<AccountController> logger)
        {
            this.authService = authService;
            this.logger = logger;
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest registrationRequest)
        {
            var result = await authService.Register(registrationRequest);

            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AuthRequest authRequest)
        {
            logger.LogInformation("Login Api Executing ...");

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            var result = await authService.Login(authRequest);

            return Ok(result);
        }
    }
}
