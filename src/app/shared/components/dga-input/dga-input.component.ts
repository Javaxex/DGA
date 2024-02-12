import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dga-input',
  templateUrl: './dga-input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaInputComponent),
      multi: true
    }
  ],
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgaInputComponent implements ControlValueAccessor {

  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() label?: MatLabel;
  @Input() type: string = 'text';

  readonly formControl: FormControl = new FormControl();

  private onModelChange: Function = () => {};
  private onModelTouched: Function = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.formControl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onModelChange(input.value);
  }

  onTouched(): void {
    this.onModelTouched();
  }

}
