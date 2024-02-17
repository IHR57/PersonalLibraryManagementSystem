using PersonalLibraryManagement.Application.Common;
using PersonalLibraryManagement.Domain.ValueObjects;

namespace PersonalLibraryManagement.Application.DTOs
{
    public class GetAllBooksQueryFilter : BaseFilter
    {
        public bool IsFavourite { get; set; }
        public ReadStatus? ReadStatus { get; set; }
        public string[] Writers { get; set; }
        public string[] Categories { get; set; }
        public DateTime? BoughtDateStart { get; set; }
        public DateTime? BoughtDateEnd { get; set; }
        public DateTime? FinishedDateStart { get; set; }
        public DateTime? FinishedDateEnd { get; set; }
        public int PriceStart { get; set; }
        public int PriceEnd { get; set; }
    }
}
