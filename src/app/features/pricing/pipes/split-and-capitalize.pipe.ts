import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitAndCapitalize', standalone: true })
export class SplitAndCapitalizePipe implements PipeTransform {
  public transform(value: string): string {
    if (!value) {
      return value;
    }

    return value
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
