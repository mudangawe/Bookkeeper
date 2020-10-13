import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ServiceService} from './service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:ServiceService){}
  search:FormGroup

  onSubmit(){}

  modelChangeFn(e){
    
    this.http.search(e.target.value)
  }

  
}
