import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';



export const routes: Routes = [
{path:'', component: HomeComponent, title: 'Home Page'},
{path:'movie', component: MovieComponent, title: 'Movie list'},

];
