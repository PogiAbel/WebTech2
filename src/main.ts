import { bootstrapApplication } from '@angular/platform-browser';
import { MainPageComponent } from './app/main-page/main-page.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';


bootstrapApplication(MainPageComponent,{
  providers: [provideRouter(routes)]

})
  .catch((err) => console.error(err));
