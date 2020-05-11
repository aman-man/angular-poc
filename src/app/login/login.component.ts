import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  header: string =  'Login-Form';
  user = {
    userEmail: 'aman@gmail.com',
    userPassword: '123456',
  }
  loginForm: FormGroup;

  constructor(private router: Router, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onLogin() {
    console.log('login', this.loginForm.value);
    if (this.loginForm.value.userEmail === this.user.userEmail && this.loginForm.value.userPassword) {
      console.log('yes');
      this.router.navigateByUrl('/home');

    } else {  
      console.log('WrongInput or invalid user trying to access');
    }
  }

  removeAll(loginForm) {
    loginForm.value = '';
  }
 
}
