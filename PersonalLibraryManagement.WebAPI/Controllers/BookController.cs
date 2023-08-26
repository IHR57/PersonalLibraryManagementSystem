using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
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

            book.Id = Guid.NewGuid();
            book.CreatedBy = bookDto.UserId;

            await bookService.AddBookAsync(book);

            return NoContent();
        }
    }
}
