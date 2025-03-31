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
  public isLoading = true

  onImageLoad() {
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }

  onImageError(event: any): void {
    this.isLoading = false;
    event.target.src = 'placeholder.png';
  }
}
