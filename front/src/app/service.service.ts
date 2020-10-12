import { Injectable } from '@angular/core';
import {Contact} from './contact';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  contactDetails:[Contact]
  localhost:"https://localhost:44309/api/Contacts"
  constructor(private http: HttpClient) { 

   
  }
  get(id)
  {
    return this.contactDetails;
  }
  getAll()
  {
    return this.contactDetails;
  }
  set(contactDetails)
  {
    this.contactDetails = contactDetails;
  }
  httpPost()
  {
    return this.http.post("https://localhost:44309/api/Contacts", this.contactDetails);
  }
  httpGet()
  {
    return this.http.get("https://localhost:44309/api/Contacts");
  }
  httpUpdate()
  {
    return this.http.put("https://localhost:44309/api/Contacts", this.contactDetails);
  }
  httpDelete()
  {
    return this.http.delete("https://localhost:44309/api/Contacts");
  }
}
