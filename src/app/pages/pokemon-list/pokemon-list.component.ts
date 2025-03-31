import { Component, HostListener, OnInit, inject } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: true,
  imports: [PokemonCardComponent, FormsModule],
})
export class PokemonListComponent implements OnInit {
  public pokemons: any[] = [];
  public isLoading = false;
  private pokeApiService = inject(PokeApiService);
  public env = environment;
  spriteTypes = [
    { value: '', label: 'Front Normal' },
    { value: 'shiny', label: 'Front Shiny' },
    { value: 'back', label: 'Back Normal' },
    { value: 'back/shiny', label: 'Back Shiny' },
    { value: 'female', label: 'Front Female' },
    { value: 'shiny/female', label: 'Front Shiny Female' },
    { value: 'back/female', label: 'Back Female' },
    { value: 'back/shiny/female', label: 'Back Shiny Female' },
  ];

  public selectedSprite = {};

  ngOnInit(): void {
    this.loadPokemons(this.pokeApiService.getPokemons());
    this.selectedSprite = this.spriteTypes[0].value;
  }

  private loadPokemons(pokemonObservable: Observable<any[]>): void {
    if (this.isLoading) return;
    this.isLoading = true;
    pokemonObservable.subscribe({
      next: (pokemons: any) => {
        this.pokemons = [...this.pokemons, ...pokemons];
      },
      error: () => {
        console.error('Error loading Pokémon');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isLoading) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadPokemons(this.pokeApiService.loadMorePokemons());
    }
  }
}
