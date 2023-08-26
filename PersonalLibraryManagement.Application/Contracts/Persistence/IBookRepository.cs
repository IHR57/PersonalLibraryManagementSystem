using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts.Persistence
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        Task<IReadOnlyList<Book>> GetUserBook(Guid id);
    }
}
