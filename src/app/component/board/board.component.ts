import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule,CardComponent]
})
export class BoardComponent {
  @Input() cards: any[] = [];
  @Input() selectedCards: number[] = [];
  @Output() cardSelectionChanged = new EventEmitter<number>();

  
  isSelected(cardId: number): boolean {
    return this.selectedCards.includes(cardId);
  }

  toggleCardSelection(cardId: number) {
    this.cardSelectionChanged.emit(cardId);
  }
}

