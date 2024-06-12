import { Component, Input, SimpleChanges } from '@angular/core';
import {MovieData} from '../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css'
})
export class MovieTileComponent {
  @Input() movie!: MovieData;

  ngOnInit(){
  }
}
