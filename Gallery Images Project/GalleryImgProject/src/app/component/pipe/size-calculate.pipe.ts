import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeCalculate',
})
export class SizeCalculatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'number') {
      throw new Error('Invalid input. Please provide a number.');
    }
    const bytes = value as number;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 Byte';
    }
    const i = parseInt(
      String(Math.floor(Math.log(bytes) / Math.log(1024))),
      10
    );
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }
}
