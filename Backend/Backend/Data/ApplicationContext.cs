using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Backend.Data
{
    public class ApplicationContext: DbContext
    {
        public ApplicationContext(DbContextOptions options):base(options)
        {   }

        public DbSet<Contact> Contact { get; set; }
        public DbSet<ContactDetail> ContactDetail { get; set; }
        
    }
}
