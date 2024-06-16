import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

async function api<JSON>(url: string): Promise<JSON> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<JSON>
    })
};

async function postComment(http: HttpClient, movieId: string, userId: string, comment: string): Promise<any> {
  try {
    const url = `/comments?movie_id=${movieId}&user_id=${userId}&comment=${comment}`;
    const response = await http.post<any>(url, {}).toPromise();
    return response;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
}


@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css'
})
export class NewCommentComponent {
  @Input() public movieId: string = '';
  public newCommentText: string = '';

  constructor(private http: HttpClient) { }

  submitComment() {
    if (this.newCommentText.trim() !== '') {
      console.log('New comment:', this.newCommentText);

      postComment(this.http, this.movieId, '1', this.newCommentText)
      this.newCommentText = ''; 
    }
  }


}
