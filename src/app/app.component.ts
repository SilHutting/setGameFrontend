import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withJsonpSupport, HttpClient } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http.interceptor';
import { GameComponent } from './component/game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [GameComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ]
})
export class AppComponent {
  title = 'Set Game!';
}
