import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class ControlPanelComponent {
  @Output() onCreateGame = new EventEmitter<string>();
  @Output() onSuggestSet = new EventEmitter<void>();
  @Output() onGetHint = new EventEmitter<void>();
  @Output() gameSelected = new EventEmitter<any>();

  //gameName: string = 'NewGame';
  selectedCards: number[] = [];
  message: string = '';
  games: any[] = [];
  gameName: string = '';


  constructor(private gameService: GameService) {}

  createGame(name: string) {
    this.onCreateGame.emit(name);
  }

  suggestSet() {
    this.onSuggestSet.emit();
  }

  getHint() {
    this.onGetHint.emit();
  }
  
  searchGames() {
    this.gameService.searchGames(this.gameName).subscribe(
      response => {
        //console.log('Search games response:', response[0]);
        this.games = response;
      });
  }

  selectGame(gameId: number) {
    this.gameSelected.emit(gameId);
  }

  deleteGame(gameId: number) {
    this.gameService.deleteGame(gameId).subscribe(() => {
        this.games = this.games.filter(game => game.id !== gameId);
        this.message = `Game ${gameId} deleted`;
      });
  }
}
