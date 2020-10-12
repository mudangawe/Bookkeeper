import { Component, OnInit } from '@angular/core';
import {faTrash ,faEdit,faCoffee } from '@fortawesome/fontawesome-free';
import {Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {Contact} from '../contact'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
  constructor(private router:Router, private http:ServiceService) {
    this.geIteams();
   }
  elements = Array(20);
  contactDetails:[Contact]
  contactAddress =[];
  ngOnInit(): void {
  }
  edit()
  { 
    this.router.navigateByUrl('/Form')
  }
  delete()
  { 
    this.router.navigateByUrl('/Form')
  }
  geIteams(): void
  {
    this.http.httpGet().subscribe(response => {this.setContact(response)});
  }
  setContact(response)
  {
      this.contactDetails = response;
      console.log(this.contactDetails)
    
      for(let index =0; index < this.contactDetails.length; index++)
      {
        let map = this.contactDetails[index].contactDetails;
        
        for(var key in map) 
        {
          //this.contactAddress( key,map[key])
        }
    }
  }
}
