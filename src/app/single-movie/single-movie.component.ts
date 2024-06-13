import { Component, OnInit } from '@angular/core';
import { MovieData, Comment } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentTileComponent } from '../comment-tile/comment-tile.component';

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
  imports: [CommonModule, CommentTileComponent],
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.css'
})
export class SingleMovieComponent implements OnInit{
  public movie!: MovieData;
  public comments!: Comment[];
  public loaded: boolean = false;
  private id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    try {
      api<MovieData>(`http://localhost:3000/movies?id=${this.id}`).then(data => {
        this.movie = data
        this.loaded = true;
      });

      api<Comment[]>(`http://localhost:3000/comments?movie_id=${this.id}`).then(data => {
        this.comments = data;
      });
    } catch (error) {
      console.log(error);
    }

  }
}
