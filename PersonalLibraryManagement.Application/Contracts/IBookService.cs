using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IBookService
    {
        Task AddBookAsync(Book book);
        Task UpdateBookAsync(Book book);
        Task<QueryPaginatedResponseDto> GetAllBooksByUserId(int index, int pageSize, string sortBy, bool ascending);
    }
}
