using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IBookService
    {
        Task<Response> AddBookAsync(Book book);
        Task UpdateBookAsync(Book book);
        Task<QueryPaginatedResponseDto> GetAllBooksByUserId(GetAllBooksQueryFilter queryFilter);
    }
}
