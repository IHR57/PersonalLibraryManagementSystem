﻿using Microsoft.AspNetCore.Http;
using PersonalLibraryManagement.Application.Common.Exceptions;
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
            Guid userId = this.GetUserId();

            book.CreatedBy = userId;
            book.UserId = userId;

            await bookRepository.CreateAsync(book);

            Response response = new Response
            {
                Success = true
            };

            return response;
        }

        public async Task<Response> UpdateBookAsync(Book book)
        {
            Guid userId = this.GetUserId();

            if (book.UserId != userId)
            {
                throw new ForbiddenAccessException();
            }

            await bookRepository.UpdateAsync(book);

            Response response = new Response
            {
                Success = true
            };

            return response;
        }

        public async Task<Response> DeleteBookAsync(string id)
        {
            Guid userId = this.GetUserId();

            Book book = await this.GetBookDetailsById(id);

            if (book.UserId != userId)
            {
                throw new ForbiddenAccessException();
            }

            await bookRepository.DeleteAsync(book);

            Response response = new Response
            {
                Success = true
            };

            return response;
        }

        public async Task<QueryPaginatedResponseDto> GetAllBooksByUserId(GetAllBooksQueryFilter queryFilter)
        {
            Guid userId = this.GetUserId();

            return await bookRepository.GetAllBooksByUserId(queryFilter, userId);
        }

        public async Task<Response> GetAllCategory(string searchKey)
        {
            Guid userId = this.GetUserId();

            return await bookRepository.GetAllCategory(userId, searchKey);
        }

        public async Task<Response> GetAllWriters(string searchKey)
        {
            Guid userId = this.GetUserId();

            return await bookRepository.GetAllWriters(userId, searchKey);
        }

        public async Task<Book> GetBookDetailsById(string bookId)
        {
            return await bookRepository.GetByIdAsync(Guid.Parse(bookId));
        }

        private Guid GetUserId()
        {
            return Guid.Parse(httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(claim => claim.Type == "uid")
                .ToString()
                .Split(" ")[1]);
        }
    }
}
