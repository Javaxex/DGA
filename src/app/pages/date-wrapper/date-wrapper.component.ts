import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { MatButtonModule } from '@angular/material/button';
import { DgaInputComponent } from '../../shared/components/dga-input/dga-input.component';

@Component({
  selector: 'date-wrapper',
  standalone: true,
  imports: [
    FormatDatePipe, MatButtonModule, ReactiveFormsModule, DgaInputComponent
  ],
  template: `
  <form [formGroup]="form">
    <div class="d-flex center">
      <button mat-raised-button color="primary" (click)="clipboardService.copy('2023-08-10T09:42:34.0734574Z')">
        Click to Copy Valid Date
      </button>
    </div>
  
    <dga-input formControlName="date" label="Enter Date"/>
  
    <div class="d-flex center">
      <span>
        {{ date | formatDate }}
      </span>
    </div>
  </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateWrapperComponent {
  public readonly clipboardService = inject(ClipboardService);

  readonly form = new FormGroup({
    date: new FormControl('', { nonNullable: true })
  })

  get date(): string {
    return this.form.controls.date.value;
  }
}
