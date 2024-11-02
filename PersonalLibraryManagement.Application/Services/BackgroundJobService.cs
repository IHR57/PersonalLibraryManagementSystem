using Hangfire;
using PersonalLibraryManagement.Application.Common.Exceptions;
using PersonalLibraryManagement.Application.Contracts;
using PersonalLibraryManagement.Application.DTOs.Response;
using PersonalLibraryManagement.Domain.Entities;

namespace PersonalLibraryManagement.Application.Services
{
    public class BackgroundJobService : IBackgroundJobService
    {
        private readonly IBackgroundJobClient backgroundJobClient;
        private readonly IBulkDataAddService<Book> bulkDataAddService;

        public BackgroundJobService(IBackgroundJobClient backgroundJobClient, IBulkDataAddService<Book> bookUploadService)
        {
            this.backgroundJobClient = backgroundJobClient;
            this.bulkDataAddService = bookUploadService;

        }

        public Response CreateNewJob(List<Book> items)
        {
            var jobId = this.backgroundJobClient.Enqueue(() => this.bulkDataAddService.AddBulkItems(items));

            return new Response
            {
                Success = true,
                Result = new
                {
                    JobId = jobId
                }
            };
        }

        public string GetJobStatus(string jobId)
        {
            var monitoringApi = JobStorage.Current.GetMonitoringApi();
            var jobDetails = monitoringApi.JobDetails(jobId);

            if (jobDetails == null)
            {
                throw new NotFoundException("Job Not Found");
            }

            return jobDetails.History.FirstOrDefault()?.StateName;
        }

        public Response ReprocessFailedJob(string jobId)
        {
            var monitoringApi = JobStorage.Current.GetMonitoringApi();
            var jobDetails = monitoringApi.JobDetails(jobId);

            if (jobDetails == null || jobDetails.History.FirstOrDefault()?.StateName != "Failed")
            {
                throw new BadRequestException("Job not found or is not in a failed state.");
            }

            var books = jobDetails.Job.Args[0] as List<Book>;
            if (books == null)
            {
                throw new BadRequestException("Failed to retrieve job data for reprocessing.");
            }

            var newJobId = this.backgroundJobClient.Enqueue(() => this.bulkDataAddService.AddBulkItems(books));

            return new Response
            {
                Success = true,
                Result = new
                {
                    OldJobId = jobId,
                    NewJobId = newJobId
                }
            };
        }
    }
}
