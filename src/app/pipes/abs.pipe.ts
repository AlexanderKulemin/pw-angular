import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Math.abs(Number(value));
  }

}
