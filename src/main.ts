import { bootstrapApplication } from '@angular/platform-browser';
import { MainPageComponent } from './app/main-page/main-page.component';

bootstrapApplication(MainPageComponent)
  .catch((err) => console.error(err));
