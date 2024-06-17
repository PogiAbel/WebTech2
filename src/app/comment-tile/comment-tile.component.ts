import { Component, DestroyRef, Input } from '@angular/core';
import { extComment } from '../interfaces';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

async function deleteComment(http: HttpClient, commentId: string): Promise<any> {
  try {
    const url = `http://localhost:3000/deleteComment?comment_id=${commentId}`;
    const response = await http.post<any>(url, {}).toPromise();
    return response;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
}

@Component({
  selector: 'app-comment-tile',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './comment-tile.component.html',
  styleUrl: './comment-tile.component.css'
})
export class CommentTileComponent {
  @Input() comment!: extComment;
  public visible: boolean = true;


  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  delComment() {
    deleteComment(this.http, this.comment._id).then(() => {
      this.visible = false;
    });
  }
}
