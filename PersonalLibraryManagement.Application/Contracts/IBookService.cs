using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IBookService
    {
        Task AddBookAsync(Book book);
        Task<IReadOnlyList<Book>> GetAllUserBooksAsync(Guid userId);
    }
}
