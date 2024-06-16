import { Component, OnInit } from '@angular/core';
import { MovieData, Comment } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentTileComponent } from '../comment-tile/comment-tile.component';
import { Login } from '../interfaces';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

async function postComment(http: HttpClient, movieId: string, userName: string,userEmail:string, comment: string): Promise<any> {
  try {
    const url = `http://localhost:3000/comments?movie_id=${movieId}&userName=${userName}&userEmail=${userEmail}&comment=${comment}`;
    const response = await http.post<any>(url, {}).toPromise();
    return response;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
}

@Component({
  selector: 'app-single-movie',
  standalone: true,
  imports: [CommonModule, CommentTileComponent, FormsModule, HttpClientModule],
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.css'
})
export class SingleMovieComponent implements OnInit{
  public movie!: MovieData;
  public comments!: Comment[];
  public loaded: boolean = false;
  public isLoggedIn: boolean = false;
  public newCommentText: string = '';

  private user!: Login;
  private id!: string;

  constructor(private route: ActivatedRoute,private cookieService: CookieService,private http: HttpClient) {}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    try {
      api<MovieData>(`http://localhost:3000/movies?id=${this.id}`).then(data => {
        this.movie = data
        this.loaded = true;
      });

    } catch (error) {
      console.log(error);
    }

    this.loadComments();

    try{
      this.getUser();
      if(this.user != null){
        this.isLoggedIn = true;
      }
    } catch (error){
    }

  }

  async submitComment() {
    if (this.newCommentText.trim() !== '') {
      await postComment(this.http,this.movie._id,this.user.name,this.user.email,this.newCommentText);

      this.newCommentText = ''; 
    }

    this.loadComments();
  }

  loadComments(){
    try {
      api<Comment[]>(`http://localhost:3000/comments?movie_id=${this.id}`).then(data => {
        this.comments = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  getUser(){
    this.user = JSON.parse(this.cookieService.get('user'));
  }
}
