﻿using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts.Persistence
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        Task<QueryPaginatedResponseDto> GetAllBooksByUserId(GetAllBooksQueryFilter queryFilter, Guid userId);

        Task<Response> GetAllCategory(Guid userId);

        Task<Response> GetAllWriters(Guid userId);
    }
}
