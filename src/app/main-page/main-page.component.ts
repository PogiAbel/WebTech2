import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MovieComponent } from '../movie/movie.component';
import { Login } from '../interfaces';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent, MovieComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  title = 'beadando';

  private login!: Login;
}
