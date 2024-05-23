import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

async function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}
let first: Comment;

class Comment {
  constructor(public id:string, public name: string, public email:string, public movie_id:string,public text:string, public date:Date) { }
  static fromJson(json: any): Comment {
    return new Comment(json._id, json.name, json.email, json.movie_id, json.text, json.date)
  }
  static fromEmpty(): Comment {
    return new Comment('', '', '', '', '', new Date())
  }
  stringify() {
    return JSON.stringify(this)
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'beadando';
  public com: Comment = Comment.fromEmpty();

  async ngOnInit() {
    let data: any = await api('http://localhost:3000/comments') as JSON;
    this.com = Comment.fromJson(data[0]);
    
  }
}
