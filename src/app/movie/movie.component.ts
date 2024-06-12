import { Component } from '@angular/core';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';
import { MovieData } from '../interfaces';

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
  selector: 'app-movie',
  standalone: true,
  imports: [MovieTileComponent,CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',

})

export class MovieComponent {
  public movies!: MovieData[];
  public loaded: boolean = false;
  ngOnInit() {
    api('http://localhost:3000/movies?title=nig').then(data =>{
      this.movies = JSON.parse(JSON.stringify(data));
      
      this.loaded = true;
    });

  }
}
