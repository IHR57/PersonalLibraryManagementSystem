﻿using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Register([FromBody] RegistrationRequest registrationRequest)
        {
            var result = await authService.Register(registrationRequest);

            return Ok(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(AuthRequest authRequest)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            var result = await authService.Login(authRequest);

            return Ok(result);
        }
    }
}
