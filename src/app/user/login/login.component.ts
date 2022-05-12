import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false
alertMsg= "Please wait! Your account is being created."
alertColor = 'blue'
login()
{
  console.log(this.credentials)
  this.showAlert = true
  this.alertMsg= "Logging you in...Please wait!"
  this.alertColor = 'blue'
}
  constructor() { }

  ngOnInit(): void {
  }

}
