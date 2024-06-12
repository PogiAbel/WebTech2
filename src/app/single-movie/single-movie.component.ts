import { Component, OnInit } from '@angular/core';
import { MovieData } from '../interfaces';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-single-movie',
  standalone: true,
  imports: [],
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.css'
})
export class SingleMovieComponent implements OnInit{
  private movieData!: MovieData;
  private id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    
    api<MovieData>(`http://localhost:3000/movies?id=${this.id}`).then(data => {
      this.movieData = data
      console.log(JSON.stringify(this.movieData));
    });
  }

  getData() {
    return JSON.stringify(this.movieData);
  }
}
