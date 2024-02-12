import { Routes } from '@angular/router';
import { JobFormComponent } from './pages/job-form/job-form.component';
import { MatchComponent } from './pages/match/match.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { CoreComponent } from './pages/core/core.component';
import { DateWrapperComponent } from './pages/date-wrapper/date-wrapper.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        redirectTo: '/register-job',
        pathMatch: 'full'
      },
      {
        path: 'register-job',
        component: JobFormComponent
      },
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'date',
        component: DateWrapperComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'match',
        component: MatchComponent
      },
    ]
  }
];
