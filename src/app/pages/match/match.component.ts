import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'match',
  standalone: true,
  imports: [ MatInputModule, MatListModule, FormsModule ],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>First Value</mat-label>
      <input
        matInput
        [(ngModel)]="firstValue"
        placeholder="Enter a value"
        (ngModelChange)="calculateMatchPercentages()"
      />
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Second Values (comma-separated)</mat-label>
      <input
        matInput
        [(ngModel)]="secondValue"
        placeholder="Enter values separated by commas"
        (ngModelChange)="calculateMatchPercentages()"
      />
    </mat-form-field>

    <mat-list>
      @for (match of matchPercentages; track match) {
        <mat-list-item>
          "{{ match.value }}" matches "{{ firstValue }}" by {{ match.percentage.toFixed(2) }}%
        </mat-list-item>
      }
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent {
  public firstValue: string = '';
  public secondValue: string = '';

  matchPercentages: { value: string; percentage: number }[] = [];

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
