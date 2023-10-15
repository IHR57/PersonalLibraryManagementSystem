using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.DTOs;
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
        public async Task<IActionResult> CreateBook([FromBody] BookDTO bookDto)
        {
            Book book = mapper.Map<Book>(bookDto);

            await bookService.AddBookAsync(book);

            return Ok("Book Added Successfully");
        }

        [HttpPost]
        public async Task<IActionResult> UpdateBook([FromBody] BookDTO bookDto)
        {
            Book book = mapper.Map<Book>(bookDto);

            await bookService.UpdateBookAsync(book);

            return Ok("Book Updated Successfully");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks([FromQuery] GetAllBooksQueryFilter queryFilter)
        {
            QueryPaginatedResponseDto result = await bookService.GetAllBooksByUserId(queryFilter);

            return Ok(result);
        }
    }
}
