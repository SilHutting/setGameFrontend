import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Shape, Fill, Color } from '../models/card';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class CardComponent {
  @Input()
  card!: Card;
  @Input() isSelected: boolean = false;
  @Output() toggleSelection = new EventEmitter<number>();

  getCardImage(): string {
    const shape = Shape[this.card.shape];
    const fill = Fill[this.card.fill];
    const color = Color[this.card.color];
    const number = this.card.number;

    return `${shape}_${fill}_${color}.png`;
  }

  getSymbolArray(): any[] {
    return new Array(this.card.number + 1);
  }

  onCardClick() {
    this.toggleSelection.emit(this.card.id);
  }
}
