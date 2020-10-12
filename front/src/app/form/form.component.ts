import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private http:ServiceService) { }
  contactDetailsForm:FormGroup
  contactDetails:{
    firstName:"",
    surname:'',
    cell:'',
    tellphone:'',
    address:''
  }
  update:true;
  ngOnInit(): void {
  }
  createForm():void{
    this.contactDetailsForm =new FormGroup({
      'firstName' : new FormControl(this.contactDetails.firstName,[Validators.required]),
      'surname' : new FormControl(this.contactDetails.surname,[Validators.required]),
      'cell' : new FormControl(this.contactDetails.cell,[Validators.required]),
      'tellphone' : new FormControl(this.contactDetails.tellphone,[Validators.required]),
      'address' : new FormControl(this.contactDetails.address,[Validators.required])
    })
  }

  onSubmit()
  {
    this.http.set(this.contactDetailsForm.value);
    if(this.update)
    {
      this.http.httpPost().subscribe(response => console.log(response))
    }
    else
    {
      this.http.httpUpdate().subscribe(response => console.log(response))
    }
  }

}
