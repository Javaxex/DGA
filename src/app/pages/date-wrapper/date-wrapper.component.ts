import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'date-wrapper',
  standalone: true,
  imports: [
    FormatDatePipe, MatInputModule, FormsModule, MatButtonModule
  ],
  template: `
    <div class="d-flex center">
      <button mat-raised-button color="primary" (click)="clipboardService.copy('2023-08-10T09:42:34.0734574Z')">
        Click to Copy Valid Date
      </button>
    </div>

    <mat-form-field appearance="fill">
      <mat-label>Date Value</mat-label>
      <input
        matInput
        [(ngModel)]="dateValue"
        placeholder="Enter a Date"
      />
    </mat-form-field>

    <div class="d-flex center">
      <span>
        {{ dateValue | formatDate }}
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateWrapperComponent {
  public readonly clipboardService = inject(ClipboardService);

  dateValue = ''
}
