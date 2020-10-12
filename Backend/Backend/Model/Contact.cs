using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Contact
    {
        public int ContactId { set; get; }
        public string FirstName { set; get; }
        public string Surname { set; get; }
        public DateTime BirthDate { set; get; }
        public DateTime UpdatedDate { set; get; }

     }
}
