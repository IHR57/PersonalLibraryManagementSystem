namespace PersonalLibraryManagement.Application.DTOs.Response
{
    public class Response
    {
        public bool Success { get; set; }
        public string[] ErrorMessages { get; set; }
        public object Result { get; set; }
    }
}
