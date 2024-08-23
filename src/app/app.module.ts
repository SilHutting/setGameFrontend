import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withJsonpSupport, HttpClient } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http.interceptor';
import { GameComponent } from './component/game/game.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [GameComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService}
  ],
  
})
export class AppModule {
  title = 'setGameFrontend';
}
