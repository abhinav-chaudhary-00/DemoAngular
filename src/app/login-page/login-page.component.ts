import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface LoginDet {
  uname: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  logindetails!: LoginDet;
  message!: String;
  errlogin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.logindetails = {
      uname: "",
      password: ""
    }
  }

  onsubmit() {
    console.log(this.logindetails);
    if (this.logindetails.uname == "admin" && this.logindetails.password == "12345678") {
      this.router.navigate(['/dashboard', this.logindetails.uname]);
    } else if (this.logindetails.uname == "abhinav" && this.logindetails.password == "12345678") {
      this.router.navigate(['/dashboard', this.logindetails.uname]);
    }
    else {
      this.errlogin = true;
      this.message = "No user found with entered credentials!"
    }
  }
}
