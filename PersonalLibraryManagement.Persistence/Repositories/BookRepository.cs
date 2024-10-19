using Microsoft.EntityFrameworkCore;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Application.DTOs.Response;
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
            IQueryable<Book> query = GetQuery(queryFilter);

            long totalItems = await query.CountAsync();

            query = query.Skip(queryFilter.PageIndex * queryFilter.PageSize)
                .Take(queryFilter.PageSize);

            var books = await query.AsNoTracking().ToListAsync();

            QueryPaginatedResponseDto queryPaginationResponseDto = new QueryPaginatedResponseDto()
            {
                Total = totalItems,
                Page = queryFilter.PageIndex,
                PageSize = queryFilter.PageSize,
                Items = books
            };

            return queryPaginationResponseDto;
        }

        public async Task<Response> GetAllCategory(Guid userId, string searchKey)
        {
            string[] categories = await context.Books
                .Where(book => book.UserId == userId && book.IsMarkedToDelete == false && book.Category.StartsWith(string.IsNullOrWhiteSpace(searchKey) ? "" : searchKey))
                .Select(book => book.Category)
                .Distinct()
                .AsNoTracking()
                .ToArrayAsync();

            Response response = new Response
            {
                Success = true,
                Result = categories
            };

            return response;
        }

        public async Task<Response> GetAllWriters(Guid userId, string searchKey)
        {
            string[] writers = await context.Books
                .Where(book => book.UserId == userId && book.IsMarkedToDelete == false && book.Writer.StartsWith(string.IsNullOrWhiteSpace(searchKey) ? "" : searchKey))
                .Select(book => book.Writer)
                .Distinct()
                .AsNoTracking()
                .ToArrayAsync();

            Response response = new Response
            {
                Success = true,
                Result = writers
            };

            return response;
        }

        public async Task<Response> GetYearlyTotalExpenses()
        {
            var result = await context.Books
                .Where(book => book.BoughtDate.HasValue)
                .GroupBy(book => book.BoughtDate.Value.Year)
                .Select(x => new YearlyExpenseResponse
                {
                    Year = x.Key.ToString(),
                    TotalExpenses = x.Sum(book => book.BuyingPrice)
                })
                .OrderBy(y => y.Year)
                .ToListAsync();

            return new Response
            {
                Success = true,
                Result = result
            };
        }

        public async Task<Response> GetTotalCategoryWiseExpenses()
        {
            var result = await context.Books
                .GroupBy(book => book.Category)
                .Select(x => new CategoryWiseExpenseResponse
                {
                    CategoryName = x.Key,
                    TotalExpenses = x.Sum(book => book.BuyingPrice)
                })
                .OrderBy(y => y.CategoryName)
                .ToListAsync();

            return new Response
            {
                Success = true,
                Result = result
};
        }

        private IQueryable<Book> GetQuery(GetAllBooksQueryFilter queryFilter)
        {
            IQueryable<Book> query = context.Books;

            query = string.IsNullOrWhiteSpace(queryFilter.SearchKey) ? query : query.Where(book => book.Name.Contains(queryFilter.SearchKey));
            query = queryFilter.Writers == null ? query : query.Where(book => queryFilter.Writers.Contains(book.Writer));
            query = queryFilter.Categories == null ? query : query.Where(book => queryFilter.Categories.Contains(book.Category));
            query = query.Where(book => book.BuyingPrice >= queryFilter.PriceStart);
            query = query.Where(book => book.BuyingPrice <= queryFilter.PriceEnd);
            query = queryFilter.BoughtDateStart.HasValue ? query.Where(book => book.BoughtDate >= queryFilter.BoughtDateStart) : query;
            query = queryFilter.BoughtDateEnd.HasValue ? query.Where(book => book.BoughtDate <= queryFilter.BoughtDateEnd) : query;
            query = queryFilter.FinishedDateStart.HasValue ? query.Where(book => book.FinishedDate <= queryFilter.FinishedDateStart) : query;
            query = queryFilter.FinishedDateEnd.HasValue ? query.Where(book => book.FinishedDate <= queryFilter.FinishedDateEnd) : query;

            Expression<Func<Book, object>> keySelector = queryFilter.SortBy switch
            {
                "name" => book => book.Name,
                "createdDate" => book => book.CreatedDate,
                "boughtDate" => book => book.BoughtDate,
                "finishedDate" => book => book.FinishedDate,
                "buyingPrice" => book => book.BuyingPrice.GetValueOrDefault(short.MaxValue),
                "personalRating" => book => book.PersonalRating.GetValueOrDefault(0),
                _ => book => book.Id
            };

            query = queryFilter.Ascending ? query.OrderBy(keySelector) : query.OrderByDescending(keySelector);

            return query;
        }
    }
}
