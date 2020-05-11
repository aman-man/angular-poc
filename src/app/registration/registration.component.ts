import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  header: string = 'Registration-Form';
  registerForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private formbuilder: FormBuilder) { 
  }

  ngOnInit(): void {

    this.registerForm = this.formbuilder.group({
      fname: ['', [Validators.required, Validators.max(10)]],
      lname: ['', [Validators.required, Validators.maxLength(10)]],
      emailId: ['',[Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.maxLength(6)]],
      // address: this.formbuilder.group({
      //   houseNo: ['']
      // })
    });
  }

  onRegister() {
    console.log(this.registerForm.value);
  }

}
