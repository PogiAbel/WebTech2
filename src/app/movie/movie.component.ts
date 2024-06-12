import { Component } from '@angular/core';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';

async function api<JSON>(url: string): Promise<JSON> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<JSON>
    })
}

interface MovieData {
  id: string;
  plot: string;
  genres: string[];
  runtime: number;
  rated: string;
  cast: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  writers: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: Date;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: string;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    lastUpdated: Date;
  };
}


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieTileComponent,CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',

})

export class MovieComponent {
  private data!: MovieData;
  public loaded: boolean = false;
  ngOnInit() {
    api('http://localhost:3000/movies?title=nig').then(data =>{
      let formatted = JSON.parse(JSON.stringify(data));
      this.data = formatted[0];
      this.loaded = true;
    });

  }
  getData() {
    return JSON.stringify(this.data);
  }
}
