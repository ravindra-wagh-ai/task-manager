import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { SecurityService } from './security.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    SecurityService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);