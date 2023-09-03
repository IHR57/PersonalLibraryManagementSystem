using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts.Persistence
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        Task<QueryPaginatedResponseDto> GetAllBooksByUserId(int index, int pageSize, string sortBy, bool ascending, Guid id);
    }
}
