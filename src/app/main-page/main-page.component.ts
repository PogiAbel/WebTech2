import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MovieComponent } from '../movie/movie.component';

async function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent, MovieComponent],
  template: `
    <header>
      <div class="container">
          <h1>Movie Database</h1>
          <nav>
              <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Movies</a></li>
                  <li><a href="#">Genres</a></li>
                  <li><a href="#">Contact</a></li>
              </ul>
          </nav>
      </div>
  </header>
  <section class="content">
    <router-outlet></router-outlet>
  </section>
  <footer>
      <div class="container">
          <p>&copy; 2024 Movie Database. All rights reserved.</p>
      </div>
  </footer>
  `,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  title = 'beadando';
}
