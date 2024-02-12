import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'core',
  standalone: true,
  imports: [
    MatTabsModule, MatButtonModule, RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './core.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {

  readonly links = [
    {
      label: 'Create Job',
      link: './register-job',
      index: 0
    },
    {
      label: 'Movies',
      link: './movies',
      index: 1
    },
    {
      label: 'Date Pipe',
      link: './date',
      index: 2
    },
    {
      label: 'Calendar',
      link: './calendar',
      index: 3
    },
    {
      label: 'Match',
      link: './match',
      index: 4
    }
  ];

  activeLink = this.links[0];
}
