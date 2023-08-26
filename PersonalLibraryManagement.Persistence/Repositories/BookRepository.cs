using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Domain.Entities;
using PersonalLibraryManagement.Infrastructure.Persistence.DatabaseContext;

namespace PersonalLibraryManagement.Persistence.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(PersonalLibraryDatabaseContext context) : base(context)
        {
        }

        Task<IReadOnlyList<Book>> IBookRepository.GetUserBook(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
