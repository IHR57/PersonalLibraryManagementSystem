using System.ComponentModel.DataAnnotations;

namespace PersonalLibraryManagement.Application.Models.Identity
{
    public class RegistrationRequest
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; } 
        [Required]
        [MinLength(6)]
        public string UserName { get; set; } 
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
