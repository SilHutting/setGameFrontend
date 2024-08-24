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
    var result = this.http.post(`${this.apiBaseUrl}/Game`, { name });
    //result.subscribe(response => {console.log('Create game response:', response)});
    return result
  }

  getGame(gameId: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/Game/${gameId}`);
  }

  suggestSet(gameId: number, cardIds: number[]): Observable<any> {
    console.log('Card IDs:', cardIds);
    return this.http.post(`${this.apiBaseUrl}/Play/${gameId}/TrySet?gameId=${gameId}`, { cardIds });
  }

  getHint(gameId: number): Observable<any> {
    var result = this.http.get<any[]>(`${this.apiBaseUrl}/Play/${gameId}/Hint?gameId=${gameId}`);
    return result
  }
  searchGames(name: string): Observable<any[]> {
    var result = this.http.get<any[]>(`${this.apiBaseUrl}/Game?name=${name}`);
    result.subscribe(response => {console.log('Search game response:', response)});
    return result
  }

  deleteGame(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/Game/${gameId}`);
  }
}
