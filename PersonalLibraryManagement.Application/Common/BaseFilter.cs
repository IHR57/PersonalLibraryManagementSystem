namespace PersonalLibraryManagement.Application.Common
{
    public class BaseFilter
    {
        public string SearchKey { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public bool Ascending { get; set; }
    }
}
