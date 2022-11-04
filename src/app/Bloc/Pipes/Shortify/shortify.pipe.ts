import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortify'
})
export class ShortifyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return (value.length>12)?value.slice(0,11)+"...": value;
  }

}
