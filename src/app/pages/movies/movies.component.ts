import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieService } from '../../core/services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Movie } from '../../core/models/movie.interface';

@Component({
  selector: 'movies',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    NgOptimizedImage
  ],
  templateUrl: './movies.component.html',
  styles: [
    `
      :host {
        mat-card-header::ng-deep .mat-mdc-card-header-text { max-width: 160px }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent {
  private readonly moviesService = inject(MovieService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchQuery$: BehaviorSubject<string> = new BehaviorSubject('starwars');
  readonly $movies = signal<Movie[]>([]);

  constructor() {
    this.searchQuery$.asObservable().pipe(
      switchMap((query: string) => this.moviesService.searchMovies(query)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((movies: Movie[]) => this.$movies.set(movies));
  }
}
