import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../models/movie.interface';

@Injectable({providedIn: 'root'})
export class MovieService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly URL: string = 'https://online-movie-database.p.rapidapi.com/title/v2/find';

  searchMovies(title: string): Observable<Movie[]> {

    const params = {
      title,
      limit: '20',
      paginationKey: '0',
      sortArg: 'moviemeter,asc'
    };

    return this.http.get<{ results: Movie[]}>(this.URL, { params }).pipe(
       map((response: { results: Movie[] }) => response.results)
    );
  }
}
