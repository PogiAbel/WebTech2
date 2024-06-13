import { Component, Input } from '@angular/core';
import { Comment } from '../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-tile.component.html',
  styleUrl: './comment-tile.component.css'
})
export class CommentTileComponent {
  @Input() comment!: Comment;

  ngOnInit() {
    console.log(this.comment);
  }
}
