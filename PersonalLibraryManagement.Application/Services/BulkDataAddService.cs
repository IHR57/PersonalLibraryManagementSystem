using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities.Base;

namespace PersonalLibraryManagement.Application.Services
{
    public class BulkDataAddService<T>: IBulkDataAddService<T> where T : BaseEntity
    {
        private readonly IGenericRepository<T> genericRepository;
        private const int ChunkSize = 100;

        public BulkDataAddService(IGenericRepository<T> genericRepository)
        {
            this.genericRepository = genericRepository;
        }

        public async Task<Response> AddBulkItems(List<T> items)
        {
            foreach (var chunk in items.Chunk(ChunkSize))
            {
                await genericRepository.AddListItemAsync(chunk.ToList());
            }

            return new Response { Success = true };
        }
    }
}
