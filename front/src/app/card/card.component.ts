import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../service.service';
import { Contact } from '../contact';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
  constructor(private router:Router, private http:ServiceService) {
    this.geIteams();
   }
  fileName= 'ExcelSheet.xlsx';
  elements = Array(20);
  contactDetails:Contact [];
  contactAddress =[];
  ngOnInit(): void {
    this.http.updateArray().subscribe(data => console.log( data))
  }
  edit(index)
  { 
   this.router.navigate(['/Form'],{queryParams:{id: index}})
  
  }
  delete(index)
  { 
    this.http.remove(index)
    this.http.httpDelete(this.contactDetails[index].ContactId)
  }
  geIteams(): void
  {
    //  this.contactDetails = this.http.getAll();
      this.http.httpGet().subscribe(response => {this.setContact(response)});
  }
  setContact(response)
  {
      this.contactDetails = this.http.getAll(); 
  }
  exportToExcel(){
    this.http.exportToExcel();
  }
}
