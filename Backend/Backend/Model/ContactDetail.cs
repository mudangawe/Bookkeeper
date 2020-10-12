using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class ContactDetail
    {
        public int ContactDetailId { set; get; }
        [ForeignKey("Contact")]
        public int ContactId { set; get; }
        public string Description { set; get; }
        [ForeignKey("ContactType")]
        public ContactType ContactTypeId { set; get; }

    }
}
