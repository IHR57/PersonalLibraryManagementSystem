using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IBookService
    {
        Task<Response> AddBookAsync(Book book);
        Task<Response> GetAllCategory(string searchKey);
        Task<Response> GetAllWriters(string searchKey);
        Task<Response> UpdateBookAsync(Book book);
        Task<Response> DeleteBookAsync(string id);
        Task<QueryPaginatedResponseDto> GetAllBooksByUserId(GetAllBooksQueryFilter queryFilter);
        Task<Book> GetBookDetailsById(string bookId);
    }
}
