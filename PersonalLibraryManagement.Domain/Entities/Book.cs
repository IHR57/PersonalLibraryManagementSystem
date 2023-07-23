using PersonalLibraryManagement.Domain.Entities.Base;
using PersonalLibraryManagement.Domain.ValueObjects;

namespace PersonalLibraryManagement.Domain.Entities
{
    public class Book : BaseEntity
    {
        public string Name { get; set; }
        public Guid CategoryId { get; set; }
        public Guid WriterId { get; set; }
        public Dictionary<string, string> Contents { get; set; }
        public Guid UserId { get; set; }
        public DateTime BoughtDate { get; set; }
        public double BuyingPrice { get; set; }
        public bool IsFavourite { get; set; }
        public double PersonalRating { get; set; }
        public DateTime FinishedDate { get; set; }
        public string PersonalNotes { get; set; }
        public bool IsMarkedToDelete { get; set; }
        public ReadStatus Status { get; set; }
    }
}
