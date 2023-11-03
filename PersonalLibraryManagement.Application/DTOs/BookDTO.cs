using PersonalLibraryManagement.Domain.ValueObjects;

namespace PersonalLibraryManagement.Application.DTOs
{
    public class BookDTO
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public string Writer { get; set; }
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        public DateTime BoughtDate { get; set; }
        public double BuyingPrice { get; set; }
        public bool IsFavourite { get; set; }
        public double PersonalRating { get; set; }
        public DateTime FinishedDate { get; set; }
        public string PersonalNotes { get; set; }
        public ReadStatus Status { get; set; }
    }
}
