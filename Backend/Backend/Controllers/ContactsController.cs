using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Controllers.Dtos;
using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationContext applicationContext;
        private readonly IMapper mapper;
        public ContactsController(ApplicationContext applicationContext, IMapper mapper)
        {
            this.applicationContext = applicationContext;


            this.mapper = mapper;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<List<ContactDtos>>> Get()
        {
            var contacts = await applicationContext.Contact.ToListAsync();
            var contactsDtos = new List<ContactDtos>();
            foreach (Contact contact in contacts)
            {
                var tempcontactsDtos = mapper.Map<ContactDtos>(contact);
                var contactDetails = applicationContext.ContactDetail.
                                    Where(details => details.ContactId == contact.ContactId).ToList();
                tempcontactsDtos.ContactDetails = new Dictionary<string, string>();
                foreach (ContactDetail tempContactDetail in contactDetails)
                {

                    tempcontactsDtos.ContactDetails.Add(tempContactDetail.ContactTypeId.ToString(), tempContactDetail.Description);

                }
                contactsDtos.Add(tempcontactsDtos);
            }
            return contactsDtos;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ContactDtos contactDtos)
        {

            var contact = mapper.Map<Contact>(contactDtos);
            await applicationContext.Contact.AddAsync(contact);
            await applicationContext.SaveChangesAsync();
            var contactDetails = Mapping(contactDtos.ContactDetails, contact.ContactId);

            contactDetails.ForEach(contactDetail => applicationContext.Add(contactDetail));

            await applicationContext.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<ValuesController>/5
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] ContactDtos contactDtos)
        {
            var TempContact = await applicationContext.Contact.FindAsync(contactDtos.ContactId);
            if (TempContact == null)
            {
                return NotFound();
            }
        
            foreach(ContactDetail contact in Mapping(contactDtos.ContactDetails, TempContact.ContactId))
            {
                var details = applicationContext.ContactDetail.SingleOrDefault(tempContact => tempContact.ContactTypeId == contact.ContactTypeId
                   && tempContact.ContactId == contact.ContactId);
                if(details != null)
                {
                    contact.ContactDetailId = details.ContactDetailId;
                    applicationContext.Entry(details).CurrentValues.SetValues(contact);
                }
                else 
                {
                    applicationContext.ContactDetail.Add(contact);
                }
                await applicationContext.SaveChangesAsync();
            }
            
            applicationContext.Entry(TempContact).CurrentValues.SetValues(mapper.Map<Contact>(contactDtos));
            await applicationContext.SaveChangesAsync();
            return Ok();

        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                applicationContext.Contact.Remove(new Contact() { ContactId = id });
                applicationContext.SaveChanges();
            }
            catch (Exception ex)
            {
                if (!applicationContext.Contact.Any(i => i.ContactId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw ex;
                }
            }
            finally
            {
                var contactDetail = applicationContext.ContactDetail.Where(tempContact => tempContact.ContactId == id);
                if (contactDetail != null)
                {
                    foreach (ContactDetail detail in contactDetail)
                    {
                        applicationContext.ContactDetail.Remove(detail);
                    }
                }
                await applicationContext.SaveChangesAsync();

            }

            return Ok();
        }
        [HttpGet("OlderThan35")]
        //public async Task<ActionResult<List<ContactDtos>>> OlderThan35()
        //{
        //    using (var command = applicationContext.Database.GetDbConnection().CreateCommand())
        //    {
        //        command.CommandText = "";
        //        applicationContext.Database.OpenConnection();
        //        using (var result = command.ExecuteReader())
        //        {
        //            var dt = new DataTable();
        //            dt.Load(result);
        //        }

        //    }
        //}
        [NonAction]
        private List<ContactDetail> Mapping (IDictionary<string,string> ContactDetails, int id)
        {
            var contactDetails = new List<ContactDetail>();
            foreach (KeyValuePair<string, string> contactDetailDto in ContactDetails)
            {
                var tempContactDetail = new ContactDetail();
                tempContactDetail.Description = contactDetailDto.Value;
                tempContactDetail.ContactId = id;
                tempContactDetail.ContactTypeId = (ContactType) Enum.Parse(typeof(ContactType),
                                                    contactDetailDto.Key, true);
                 contactDetails.Add(tempContactDetail);
            }
            return contactDetails;
        }
        
        

    }
}
