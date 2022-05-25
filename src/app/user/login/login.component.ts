import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
alertMsg= "Please wait! We are logging you in."
alertColor = 'blue'
inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  async login()
{
  this.showAlert = true
  this.alertMsg= "Please wait! We are logging you in."
  this.alertColor = 'blue'
  this.inSubmission = true

  try
  {
await this.auth.signInWithEmailAndPassword(
  this.credentials.email, 
  this.credentials.password 
)
  }
  catch(e)
  {
    console.log(e)
  this.showAlert = true
  this.alertMsg= "An error occurred! Please contact your administrator."
  this.alertColor = 'red'
  this.inSubmission = false
  return
  }
  this.alertMsg= "You have been successfully logged in."
  this.alertColor = 'green'
  
}

  ngOnInit(): void {
  }

}
