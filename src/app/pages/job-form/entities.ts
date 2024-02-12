import { FormArray, FormControl } from "@angular/forms";

export interface JobControl {
  companyName: FormControl<string>,
  website: FormControl<string>,
  description: FormControl<string>,
  positions: FormArray<FormControl<PositionControl>>
}

export interface PositionControl {
  positionName: FormControl<string>;
  level: FormControl<PositionLevel>;
  description: FormControl<string>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
}

export type PositionLevel = 'Junior' | 'Middle' | 'Senior';
