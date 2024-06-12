import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';



export const routes: Routes = [
{path:'', component: HomeComponent, title: 'Home Page'},
{path:'movies', component: MovieComponent, title: 'Movie list'},
{path:'movie/:id', component: SingleMovieComponent}
];
