using PersonalLibraryManagement.Application.Models.Identity;

namespace PersonalLibraryManagement.Application.Identity
{
    public interface IAuthService
    {
        Task<AuthResponse> Login(AuthRequest request);

        Task<RegistrationResponse> Register(RegistrationRequest request); 
    }
}
