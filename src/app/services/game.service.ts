import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiBaseUrl = "http://localhost:5099/api";

  constructor(private http: HttpClient) { }

  createGame(name: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/Game`, { name });
  }

  getGame(gameId: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/Game/${gameId}`);
  }

  suggestSet(gameId: number, cardIds: number[]): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/Play/${gameId}`, { cardIds });
  }

  getHint(gameId: number): Observable<any> {
    var result = this.http.get<any[]>(`${this.apiBaseUrl}/Play/${gameId}/Hint?gameId=${gameId}`);
    console.log('gameId:', gameId);
    return result
  }
}
