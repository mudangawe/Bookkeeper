import { Injectable } from '@angular/core';
import {Contact,formContactDetails} from './contact';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, ObservedValueOf } from 'rxjs'
import * as XLSX from 'xlsx'; 
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  contactDetails:Contact[]
  private monitorArray = new Subject<any>();
  contactDetail :{
  contactDetails:{
          Cell:string,
          Telephone:string,
          Address:string
      };
      ContactId:number;
      FirstName:string;
      Surname: string;
      BirthDate:string
  }
  localhost:"https://localhost:44309/api/Contacts"
  constructor(private http: HttpClient) { 

   
  }
  get(id)
  {
    return this.contactDetails;
  }
  getAll()
  {
    this.populateDate();
    return this.contactDetails;
  }
  set(contactDetails)
  {
    this.contactDetails = contactDetails;
  }
  remove(index:number)
  {
    this.contactDetails.splice(index,1);
    this.monitorArray.next({array:this.contactDetails});
  }
  httpPost()
  {
    return this.http.post("https://localhost:44309/api/Contacts", this.contactDetails);
  }
  httpGet()
  {
    return this.http.get("https://localhost:44309/api/Contacts");
  }
  httpUpdate(contactDetails:Contact)
  {
    return this.http.put("https://localhost:44309/api/Contacts", contactDetails);
  }
  httpDelete(id)
  {
    return this.http.delete("https://localhost:44309/api/Contacts/"+id);
  }
  populateDate()
  {
    this.contactDetails = [
      {
        ContactId:0,
        contactDetails:{ 
            Cell:"0769135519",
            Telephone:null,
            Address:null
        },
        
        FirstName:"Ndivhuwo",
        Surname: "Ramashia",
        BirthDate: "12/02/2012"
       },
       {
        ContactId:1,
        contactDetails:{ 
            Cell:"0769135519",
            Telephone:"0112542221",
            Address:null
        },
        
        FirstName:"Una",
        Surname: "Ramashia",
        BirthDate: "12/02/2012",
       }
    ]
  }
  convertContactFormat(index)
  {
      this.populateDate();
      console.log(index)
      return {
          firstName: this.contactDetails[index].FirstName,
          surname: this.contactDetails[index].Surname,
          cell: this.contactDetails[index].contactDetails.Cell || "0",
          telephone:this.contactDetails[index].contactDetails.Telephone || "0",
          address:this.contactDetails[index].contactDetails.Address || "0"
      }
  }
  convertContactback(index, data: formContactDetails)
  {
    var contactDetail= {
            ContactId: this.contactDetails[index].ContactId,
            BirthDate: this.contactDetails[index].BirthDate,
            FirstName: data.firstName,
            Surname: data.surname,
             contactDetails :{
                        Cell: data.cell || "0",
                        Telephone: data.telephone || "0",
                        Address: data.address || "0"}}
           this.monitorArray.next({update:true});
    return this.contactDetail
  }
  updateArray():Observable<any>{
    return this.monitorArray.asObservable();
  }
  toExportFileName(excelFileName: string): string {
    var date = new Date();
    return `${excelFileName}_${date.getMonth() + 1}${date.getDate()}${date.getFullYear()}.xlsx`;
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
  }

  exportToExcel() {
    this.exportAsExcelFile(this.contactDetails, 'bookkeeper');
  }
  filterObj(keys, obj: Contact[]): Contact[] {
    const newObj = {} as  Contact[];
    Object.keys(obj).forEach(key => {
      if (keys.includes(key)) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }
  search(search)
  {
    console.log(this.filterObj("FirstName",this.contactDetails));
  }
}
