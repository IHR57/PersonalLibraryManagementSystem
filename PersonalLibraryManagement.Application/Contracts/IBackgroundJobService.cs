using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Contracts
{
    public interface IBackgroundJobService
    {
        string GetJobStatus(string jobId);

        Response ReprocessFailedJob(string jobId);

        Response CreateNewJob(List<Book> items);
    }
}
