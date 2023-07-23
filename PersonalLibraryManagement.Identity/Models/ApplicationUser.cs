using Microsoft.AspNetCore.Identity;

namespace PersonalLibraryManagment.Infrastructure.Identity.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string DisplayName { get; set; }
    }
}
