using Microsoft.EntityFrameworkCore;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;
using PersonalLibraryManagement.Infrastructure.Persistence.DatabaseContext;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PersonalLibraryManagement.Persistence.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        public BookRepository(PersonalLibraryDatabaseContext context) : base(context)
        {
        }

        public async Task<QueryPaginationResponseDto> GetAllBooksByUserId(int index, int pageSize, string sortBy, bool ascending, Guid id)
        {
            IQueryable<Book> query = context.Books;

            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                var propertyInfo = typeof(Book).GetProperty(sortBy,
                    System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);

                if (propertyInfo != null)
                {
                    query = ascending
                    ? query.OrderBy(x => propertyInfo.GetValue(x, null))
                        : query.OrderByDescending(x => propertyInfo.GetValue(x, null));
                }
            }

            long totalItems = await query.CountAsync();

            query = query.Skip((index - 1) * pageSize).Take(pageSize);

            var books = await query.ToListAsync();

            QueryPaginationResponseDto queryPaginationResponseDto = new QueryPaginationResponseDto()
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
