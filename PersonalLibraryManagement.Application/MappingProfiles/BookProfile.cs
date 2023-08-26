using AutoMapper;
using PersonalLibraryManagement.Application.DTOs;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.MappingProfiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<Book, BookDTO>().ReverseMap();
        }
    }
}
