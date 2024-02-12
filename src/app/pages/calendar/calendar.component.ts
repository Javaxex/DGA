import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { isBefore } from 'date-fns';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="d-flex center">
      <mat-form-field class="w-50-p" appearance="fill">

        <mat-label>Date</mat-label>

        <input matInput [matDatepickerFilter]="isHoliday" [matDatepicker]="datePicker" [(ngModel)]="selectedDate">

        <mat-datepicker-toggle matSuffix [for]="datePicker" />

        <mat-datepicker [dateClass]="weekendDateClass" #datePicker />

      </mat-form-field>
    </div>
  `,
  styles: `
    :host {
      // Need to dig and find reference to it, might be needed ::ng-deep
      .weekend-date {
        background: red;
      }
    }
  `,
  providers: [ provideNativeDateAdapter() ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  selectedDate: Date;
  today: Date = new Date();

  readonly holidays: Date[] = [
    new Date('2024-02-15'),
    new Date('2024-02-20'),
  ];

  constructor() {
    this.selectedDate = this.today;
  }

  weekendDateClass = (date: Date): string => {
    const day = date.getDay();

    return (day === 0 || day === 6) ? 'weekend-date' : '';
  };

  isHoliday = (date: Date | null): boolean => {
    if (date) {
      this.today.setHours(0, 0, 0, 0);

      if (isBefore(date, this.today)) {
        return false;
      }

      const isHolidayDate = this.holidays.some(
        holiday => holiday.getDate() === date.getDate() &&
                   holiday.getMonth() === date.getMonth() &&
                   holiday.getFullYear() === date.getFullYear()
      );

      const day = date.getDay();
      const isWeekend = day === 0 || day === 6;

      return !isHolidayDate && !isWeekend;
    }

    return true;
  };
}
