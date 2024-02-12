import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string): string {

    if (typeof value === 'string') {
      const date = new Date(value);
      const isValidDate = !isNaN(date.getTime());

      if (isValidDate) {
        return formatDate(date, 'HH:mm:ss MMM dd yyyy', 'en-US');
      }

      return value;
    }

    if (value instanceof Date) {
      return formatDate(value, 'HH:mm:ss MMM dd yyyy', 'en-US');
    }

    return value;
  }
}
