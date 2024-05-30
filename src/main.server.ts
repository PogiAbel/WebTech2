import { bootstrapApplication } from '@angular/platform-browser';
import { MainPageComponent } from './app/main-page/main-page.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(MainPageComponent, config);

export default bootstrap;
