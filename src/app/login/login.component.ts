import { Component, Input, Output } from '@angular/core';
import { Login } from '../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() login!: Login;

  ngOnInit(){
  }
}
