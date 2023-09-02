using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;
using System.Security.Claims;

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

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooksByUserId(
            [FromQuery] int index = 1, 
            [FromQuery] int pageSize = 10, 
            [FromQuery] string sortBy = "CreatedDate", 
            [FromQuery] bool ascending = false)
        {
            QueryPaginationResponseDto result = await bookService.GetAllBooksByUserId(index, pageSize, sortBy, ascending);

            return Ok(result);
        }
    }
}
