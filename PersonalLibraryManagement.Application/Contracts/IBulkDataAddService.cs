using PersonalLibraryManagement.Application.DTOs.Response;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IBulkDataAddService<T>
    {
        Task<Response> AddBulkItems(List<T> items);
    }
}
