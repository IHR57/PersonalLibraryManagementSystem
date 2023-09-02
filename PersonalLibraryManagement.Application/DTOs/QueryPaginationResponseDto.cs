namespace PersonalLibraryManagement.Application.DTOs
{
    public class QueryPaginationResponseDto
    {
        public long Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public object Items { get; set; }
    }
}
