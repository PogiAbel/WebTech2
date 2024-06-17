import { Component } from '@angular/core';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';
import { MovieData } from '../interfaces';
import { FormsModule } from '@angular/forms';

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
  imports: [MovieTileComponent,CommonModule, FormsModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',

})

export class MovieComponent {
  private movies!: MovieData[];
  public loaded: boolean = false;

  ngOnInit() {
    api('http://localhost:3000/movies').then(data =>{
      this.movies = JSON.parse(JSON.stringify(data));
      
      this.loaded = true;
    });
  }

  searchMovie(title: string){
    try {
      api(`http://localhost:3000/movies?title=${title}`).then(data =>{
        this.movies = JSON.parse(JSON.stringify(data));
        
        this.loaded = true;
      });
    } catch (error) {
      window.alert('Error searching for movies');
      console.log(error);
    }

  }

  loadMore(title: string){
    try {
      api(`http://localhost:3000/movies?title=${title}&more=true`).then(data =>{
        this.movies = JSON.parse(JSON.stringify(data));
        
        this.loaded = true;
      });
    } catch (error) {
      window.alert('Error loading more movies');
      console.log(error);
    }
  
  }

  getMovies(){
    if(!this.loaded) return [];
    return this.movies;
  }
  getMoviesLength(){
    if(!this.loaded) return [];
    return this.movies.length;
  }
}
