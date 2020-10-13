import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private http:ServiceService, private activated_route:ActivatedRoute, private route: Router) {
      this.createFormGroup();
      this.index = this.activated_route.snapshot.queryParamMap.get('id');
     
   }
  contactDetailsForm:FormGroup
  contactDetails ={
    firstName:"",
    surname:"",
    cell:"",
    telephone:"",
    address:""
  }
  index:any
  update:boolean;
  ngOnInit(): void {
   
   
  }
  createFormGroup():void{
    this.contactDetailsForm =new FormGroup({
      'firstName' : new FormControl(this.contactDetails.firstName,[Validators.required]),
      'surname' : new FormControl(this.contactDetails.surname,[Validators.required]),
      'cell' : new FormControl(this.contactDetails.cell,[Validators.required]),
      'telephone' : new FormControl(this.contactDetails.telephone,[Validators.required]),
      'address' : new FormControl(this.contactDetails.address,[Validators.required])
    })}
  ngAfterViewInit(){
    if(this.index!=null)
    {
        this.contactDetailsForm.setValue(this.http.convertContactFormat(this.index))
        this.http.convertContactFormat(this.index)
    }
  }
  onSubmit()
  {
     
    if(this.index ==null)
    {
      this.http.httpPost().subscribe(response => console.log(response))
    }
    else
    {
       
      this.http.httpUpdate(this.http.convertContactback(this.index,this.contactDetailsForm.value))
                          .subscribe(response => console.log(response))
    }
    this.route.navigateByUrl("");
  }

}
