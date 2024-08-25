import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { BoardComponent } from '../board/board.component';
import { CardComponent } from '../card/card.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [BoardComponent, ControlPanelComponent, CardComponent]
})
export class GameComponent {
  game: any;
  selectedCards: number[] = [];
  message: string = '';
  hintMessage: string = '';

  constructor(private gameService: GameService) {
    this.game = {};
    this.game.score = 0;
  }

  createGame(name: string) {
    this.gameService.createGame(name).subscribe(response => {
      this.game = response;
      console.log('Game created:', this.game);
      this.selectedCards = [];
      this.message = '';
      this.hintMessage = '';
    });
  }
  toggleCardSelection(cardId: number) {
    if (this.selectedCards.includes(cardId)) {
      this.selectedCards = this.selectedCards.filter(id => id !== cardId);
    } else {
      if (this.selectedCards.length < 3) {
        this.selectedCards.push(cardId);
      }
    }
    console.log('Selected cards:', this.selectedCards);
  }
  suggestSet() {
    if (this.selectedCards.length === 3 && this.game?.id) {
      this.gameService.suggestSet(this.game.id, this.selectedCards).subscribe(response => {
        console.log(response);
        if (response.message === "Set is valid!") {
          this.game = response.game;
          console.log('Game updated:', this.game);
          this.message = 'Correct set, +10 points.';
          this.selectedCards = [];
          // New game score is included in the new game object
        } else {
          this.message = 'Set is invalid!';
          this.game.score--;
        }
      });
    }
  }

  getHint() {
    if (!this.game.id) return;
    this.gameService.getHint(this.game.id).subscribe(response => {
      const hintCards = response.hint;
      //console.log('Hint request resonse', response);
      this.message = `Hint: ${hintCards}`;
      this.game.score--;
    });
  }
  loadGame(gameId: number) {
    this.gameService.getGame(gameId).subscribe(
      response => {
        this.game = response;
        this.selectedCards = [];
        this.message = `Game ${gameId} loaded successfully.`;
      });
  }
}
