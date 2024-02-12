import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DgaInputComponent } from '../../shared/components/dga-input/dga-input.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobControl, PositionControl, PositionLevel } from './entities';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { minLengthValidator } from '../../core/validators/min-length-validator';
import { urlValidator } from '../../core/validators/url-validator';

@Component({
  selector: 'job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
  standalone: true,
  imports: [
    DgaInputComponent,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobFormComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);

  public readonly $levels = signal<PositionLevel[]>([ 'Junior', 'Middle', 'Senior' ]);
  public readonly form = new FormGroup<{ jobs: FormArray<FormControl<JobControl[]>> }>({
    jobs: new FormArray<FormControl<JobControl[]>>([])
  });

  get jobs(): FormArray {
    return this.form.get('jobs') as FormArray;
  }

  get positions(): FormArray {
    return this.jobs.get('positions') as FormArray;
  }

  addJob(): void {
    const jobGroup = this.fb.group<JobControl>({
      companyName: new FormControl<string>('', { validators: [ Validators.required ], nonNullable: true }),
      website: new FormControl<string>('', { validators: [ Validators.required, urlValidator() ], nonNullable: true }),
      description: new FormControl<string>('', { validators: [ Validators.required, minLengthValidator(10) ], nonNullable: true }),
      positions: new FormArray<FormControl<PositionControl>>([], { validators: [ Validators.required ] }),
    });

    this.jobs.push(jobGroup);
  }

  addPosition(jobIndex: number): void {
    const jobGroup = this.jobs.at(jobIndex) as FormGroup;
    const positions = jobGroup.get('positions') as FormArray;

    const positionGroup = this.fb.group<PositionControl>({
      positionName: new FormControl<string>('', { validators: [ Validators.required ], nonNullable: true }),
      level: new FormControl<PositionLevel>('Junior', { validators: [ Validators.required ], nonNullable: true }),
      description: new FormControl<string>('', { validators: [ Validators.required, minLengthValidator(10) ], nonNullable: true }),
      startDate: new FormControl<Date>(new Date(), { validators: [ Validators.required ], nonNullable: true }),
      endDate: new FormControl<Date>(new Date(), { validators: [ Validators.required ], nonNullable: true }),
    });

    positions.push(positionGroup);
  }

  removeJob(jobIndex: number): void {
    this.jobs.removeAt(jobIndex);
  }

  removePosition(jobIndex: number, positionIndex: number): void {
    const positions = this.jobs.at(jobIndex).get('positions') as FormArray;

    positions.removeAt(positionIndex);
  }

  getPositions(jobIndex: number): FormArray {
    return this.jobs.at(jobIndex).get('positions') as FormArray;
  }

}
