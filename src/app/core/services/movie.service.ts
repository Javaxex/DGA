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
      title: title,
      limit: '20',
      paginationKey: '0',
      sortArg: 'moviemeter,asc'
    };

    return this.http.get<Movie[]>(this.URL, { params }).pipe(
      // Response status code is "204 No Content" so i return mock data
      map(() => (
          [
            {
              id: 1,
              title: '1 test movie',
              description: '1 test movie description',
              imageUrl: 'https://picsum.photos/id/237/200/300'
            },
            {
              id: 2,
              title: '2 test movie',
              description: '2 test movie description',
              imageUrl: 'https://picsum.photos/seed/picsum/200/300'
            },
            {
              id: 3,
              title: '3 test movie',
              description: '3 test movie description',
              imageUrl: 'https://picsum.photos/200/300?grayscale'
            },
            {
              id: 4,
              title: '4 test movie',
              description: '4 test movie description',
              imageUrl: 'https://picsum.photos/200/300/?blur'
            }
          ].filter(movie =>
            movie.title.toLowerCase().includes(title.toLowerCase())
          )
      ))
    );
  }
}
