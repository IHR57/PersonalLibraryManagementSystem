using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            this.bookRepository = bookRepository;
        }

        public async Task AddBookAsync(Book book)
        {
            await bookRepository.CreateAsync(book);
        }

        public async Task<IReadOnlyList<Book>> GetAllUserBooksAsync(Guid userId)
        {
            return await bookRepository.GetUserBook(userId);
        }
    }
}
