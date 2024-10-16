using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class BookController : Controller
    {
        private readonly IBookService bookService;
        private readonly IMapper mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            this.bookService = bookService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<Response> CreateBook([FromBody] BookDTO bookDto)
        {
            return await bookService.AddBookAsync(mapper.Map<Book>(bookDto));
        }

        [HttpGet]
        public async Task<Response> GetAllCategory([FromQuery] string searchKey)
        {
            return await bookService.GetAllCategory(searchKey);
        }

        [HttpPost]
        public async Task<Response> UpdateBook([FromBody] BookDTO bookDto)
        {
            return await bookService.UpdateBookAsync(mapper.Map<Book>(bookDto));
        }

        [HttpDelete("{id}")]
        public async Task<Response> DeleteBook([FromRoute] string id)
        {
            return await bookService.DeleteBookAsync(id);
        }

        [HttpGet]
        public async Task<QueryPaginatedResponseDto> GetAllBooks([FromQuery] GetAllBooksQueryFilter queryFilter)
        {
            return await bookService.GetAllBooksByUserId(queryFilter);
        }

        [HttpGet]
        public async Task<Response> GetAllWriters([FromQuery] string searchKey)
        {
            return await bookService.GetAllWriters(searchKey);
        }

        [HttpGet("{id}")]
        public async Task<Book> GetBookDetails([FromRoute] string id)
        {
            return await bookService.GetBookDetailsById(id);
        }
    }
}
