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

        public async Task<QueryPaginatedResponseDto> GetAllBooksByUserId(GetAllBooksQueryFilter queryFilter, Guid id)
        {
            IQueryable<Book> query = context.Books;

            Expression<Func<Book, object>> keySelector = queryFilter.SortBy.ToLower() switch
            {
                "name" => book => book.Name,
                "createdDate" => book => book.CreatedDate,
                "boughtDate" => book => book.BoughtDate,
                "finishedDate" => book => book.FinishedDate,
                _ => book => book.Id
            };

            query = queryFilter.Ascending ? query.OrderBy(keySelector) : query.OrderByDescending(keySelector)
                .Skip((queryFilter.PageIndex) * queryFilter.PageSize)
                .Take(queryFilter.PageSize);

            long totalItems = await query.CountAsync();

            var books = await query.ToListAsync();

            QueryPaginatedResponseDto queryPaginationResponseDto = new QueryPaginatedResponseDto()
            {
                Total = totalItems,
                Page = queryFilter.PageIndex,
                PageSize = queryFilter.PageSize,
                Items = books
            };

            return queryPaginationResponseDto;
        }
    }
}
