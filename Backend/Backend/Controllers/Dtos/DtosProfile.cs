using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Model;

namespace Backend.Controllers.Dtos
{
    public class DtosProfile: Profile
    {
        public DtosProfile()
        {
            CreateMap<Contact, ContactDtos>().ForMember(destination => destination.ContactDetails, option => new KeyValuePair<string,string>("Ted","Ted"));
                                            
            CreateMap<ContactDtos, Contact>()
                .ForMember(destination => destination.UpdatedDate, options => 
                options.MapFrom(option => DateTime.Now));
            CreateMap<ContactDetail, ContactDtos>()
                .ForMember(destination => destination.ContactDetails, options => 
                 options.MapFrom(option =>new KeyValuePair<string,string> (Enum.GetName(typeof(ContactType), option.ContactTypeId),option.Description) ));
          
        }
    }
}
