using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers.Dtos
{
    public class ContactDtos
    {
        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public Dictionary<string, string> ContactDetails { get; set; }
    }
}
