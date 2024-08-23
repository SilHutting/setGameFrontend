import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  //gameName: string = 'NewGame';
  selectedCards: number[] = [];
  message: string = '';

  createGame(name: string) {
    this.onCreateGame.emit(name);
  }

  suggestSet() {
    this.onSuggestSet.emit();
  }

  getHint() {
    this.onGetHint.emit();
  }
}
