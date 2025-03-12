import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private limit = 45;
  private offset = 0;
  private httpClient = inject(HttpClient);

  getPokemons(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}?limit=${this.limit}&offset=${this.offset}`)
      .pipe(map((response) => response.results));
  }

  loadMorePokemons(): Observable<any[]> {
    this.offset += this.limit;
    return this.getPokemons();
  }
}
