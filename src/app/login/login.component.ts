import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../interfaces';

async function api<JSON>(url: string): Promise<JSON> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<JSON>
    })
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email!: string;
  public password!: string;

  public user!: Login | null;

  public error: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(private cookieService: CookieService){}

  ngOnInit(){
    try{
      this.getUser();
      if(this.user != null){
        this.isLoggedIn = true;
      }
    } catch (error){
    }
    console.log("nginit " + this.cookieService.get('user'));
  }

  login() {
    const loginDetails = { email: this.email, password: this.password };
    api(`http://localhost:3000/user?email=${loginDetails.email}&password=${loginDetails.password}`).then((data) => {
      if(data != null){
        let user: Login = data as Login;
        console.log(user);
        this.error = false;
        
        this.cookieService.set('user', JSON.stringify(user));
        this.getUser();

        this.isLoggedIn = true;
      }
      else{
        this.error = true;
      }
    });
  }

  logout(){
    this.cookieService.delete('user');
    this.isLoggedIn = false;
    this.user = null;
  }

  getUser(){
    this.user = JSON.parse(this.cookieService.get('user'));
  }
}
