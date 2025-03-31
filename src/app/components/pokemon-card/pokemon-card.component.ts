import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [CommonModule]
})
export class PokemonCardComponent {
  @Input() pokemonName: string = '';
  @Input() pokemonImgUrl: string = '';

  onImageError(event: any): void {
    event.target.src = 'placeholder.png';
  }
}
