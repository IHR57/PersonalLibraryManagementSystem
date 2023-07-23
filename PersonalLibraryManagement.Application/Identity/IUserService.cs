using PersonalLibraryManagement.Application.Models.Identity;

namespace PersonalLibraryManagement.Application.Identity
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();

        Task<User> GetUser(string UserId);

        public string UserId { get; }
    }
}
