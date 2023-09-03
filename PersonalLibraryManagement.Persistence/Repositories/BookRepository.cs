using Microsoft.EntityFrameworkCore;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;
using PersonalLibraryManagement.Infrastructure.Persistence.DatabaseContext;
using System.Linq.Expressions;

namespace PersonalLibraryManagement.Persistence.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(PersonalLibraryDatabaseContext context) : base(context)
        {
        }

        public async Task<QueryPaginatedResponseDto> GetAllBooksByUserId(int index, int pageSize, string sortBy, bool ascending, Guid id)
        {
            IQueryable<Book> query = context.Books;

            Expression<Func<Book, object>> keySelector = sortBy.ToLower() switch
            {
                "name" => book => book.Name,
                "createdDate" => book => book.CreatedDate,
                "boughtDate" => book => book.BoughtDate,
                "finishedDate" => book => book.FinishedDate,
                _ => book => book.Id
            };

            query = ascending ? query.OrderBy(keySelector) : query.OrderByDescending(keySelector);

            long totalItems = await query.CountAsync();

            query = query.Skip((index - 1) * pageSize).Take(pageSize);

            var books = await query.ToListAsync();

            QueryPaginatedResponseDto queryPaginationResponseDto = new QueryPaginatedResponseDto()
            {
                Total = totalItems,
                Page = index,
                PageSize = pageSize,
                Items = books
            };

            return queryPaginationResponseDto;
        }
    }
}
