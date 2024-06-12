import { Component, Input } from '@angular/core';
import {MovieData} from '../interfaces';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css'
})
export class MovieTileComponent {
  @Input() movie!: MovieData;

  ngOnInit(){
    
  }
}
