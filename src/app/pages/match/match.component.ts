import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { DgaInputComponent } from '../../shared/components/dga-input/dga-input.component';

@Component({
  selector: 'match',
  standalone: true,
  imports: [ MatListModule, FormsModule, DgaInputComponent, ReactiveFormsModule ],
  template: `
    <form [formGroup]="form" class="p-20">
      <dga-input formControlName="firstValue" label="Enter Value" />
      <dga-input formControlName="secondValue" label="Enter Value" />
  
      <mat-list>
        @for (match of matchPercentages; track match; let index = $index) {
          <mat-list-item>
            {{ index }} - <b>"{{ match.value }}"</b> matches to <b>"{{ firstValue }}"</b> by {{ match.percentage.toFixed(2) }}%
          </mat-list-item>
        }
      </mat-list>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly form = new FormGroup<{ firstValue: FormControl<string>; secondValue: FormControl<string> }>({
    firstValue: new FormControl('', { nonNullable: true }),
    secondValue: new FormControl('', { nonNullable: true })
  })

  get secondValue(): string {
    return this.form.controls.secondValue.value
  }

  get firstValue(): string {
    return this.form.controls.firstValue.value
  }

  matchPercentages: { value: string; percentage: number }[] = [];

  constructor() {
    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.calculateMatchPercentages());
  }

  calculateMatchPercentages(): void {
    const secondValue = this.secondValue.split(',').map(s => s.trim());

    this.matchPercentages = secondValue.map(val => {
      const matchPercentage = this.calculateMatchPercentage(this.firstValue, val);

      return { value: val, percentage: matchPercentage };
    });
  }

  private calculateMatchPercentage(firstValue: string, secondValue: string): number {
    const regex = new RegExp(firstValue.split('').join('.*?'), 'i');
    const match = secondValue.match(regex);

    if (match) {
      return (match[0].length / secondValue.length) * 100;
    }

    return 0;
  }
}
