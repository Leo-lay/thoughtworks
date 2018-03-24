import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterable'
})
@Pipe({ name: 'iterable' })
export class IterablePipe implements PipeTransform {
  transform(iterable: any, args: any[]): any {
    const result = [];

    if (iterable.entries) {
      iterable.forEach((value, key) => {
        result.push({ key: key, value: value });
      });
    } else {
      for (const key in iterable) {
        if (iterable.hasOwnProperty(key)) {
          result.push({ key: key, value: iterable[key] });
        }
      }
    }

    return result;
  }
}
