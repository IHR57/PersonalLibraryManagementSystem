namespace PersonalLibraryManagement.Application.DTOs.Response
{
    public class QueryPaginatedResponseDto
    {
        public long Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public object Items { get; set; }
    }
}
