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
  gameId: number | undefined;
  //gameScore: number = 0;
  message: string = '';
  hintMessage: string = '';

  constructor(private gameService: GameService) {
    this.game = {};
    this.game.score = 0;
  }

  createGame(name: string) {
    this.gameService.createGame(name).subscribe(response => {
      this.game = response;
      //this.gameScore = response.score;
      this.gameId = response.id;
      this.message = '';
      this.hintMessage = '';
    });
  }
  toggleCardSelection(cardId: number) {
    console.log('Card selected:', cardId);
    if (this.selectedCards.includes(cardId)) {
      this.selectedCards = this.selectedCards.filter(id => id !== cardId);
    } else {
      if (this.selectedCards.length < 3) {
        this.selectedCards.push(cardId);
      }
    }
  }
  suggestSet() {
    if (this.selectedCards.length === 3 && this.game?.id) {
      this.gameService.suggestSet(this.game.id, this.selectedCards).subscribe(response => {
        if (response.Message === "Set is valid!") {
          this.game = response.Game;
          this.message = 'Correct set, +10 points.';
          // New game score is included in the new game object
        } else {
          this.message = 'Set is invalid!';
          this.game.score--;
        }
      });
    }
  }

  getHint() {
    if (!this.gameId) return;
    this.gameService.getHint(this.gameId).subscribe(response => {
      const hintCards = response.hint;
      //console.log('Hint request resonse', response);
      this.message = `Hint: ${hintCards}`;
      this.game.score--;
    });
  }
}
