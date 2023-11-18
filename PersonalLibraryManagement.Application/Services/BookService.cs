using Microsoft.AspNetCore.Http;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository bookRepository;
        private readonly IHttpContextAccessor httpContextAccessor;

        public BookService(IBookRepository bookRepository, IHttpContextAccessor httpContextAccessor)
        {
            this.bookRepository = bookRepository;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<Response> AddBookAsync(Book book)
        {
            Guid userId = Guid.Parse(httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == "uid").ToString().Split(" ")[1]);

            book.CreatedBy = userId;
            book.UserId = userId;

            await bookRepository.CreateAsync(book);

            Response response = new Response
            {
                Success = true
            };

            return response;
        }

        public async Task UpdateBookAsync(Book book)
        {
            Guid userId = Guid.Parse(httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == "uid").ToString().Split(" ")[1]);

            if(book.UserId != userId)
            {

            }

            await bookRepository.UpdateAsync(book);
        }

        public async Task<QueryPaginatedResponseDto> GetAllBooksByUserId(GetAllBooksQueryFilter queryFilter)
        {
            Guid userId = Guid.Parse(httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == "uid").ToString().Split(" ")[1]);

            return await bookRepository.GetAllBooksByUserId(queryFilter, userId);
        }
    }
}
