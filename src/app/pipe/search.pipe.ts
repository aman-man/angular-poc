import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], ...args: any[]): any {
    var val = args[0];
    var lowerEnabled = args.length>1 ? args[1] : false;
    // console.log('Value take a input', value);
    // console.log('Args: ', args);
    // return value * args[0];
    return array.filter((element)=> {
      if (lowerEnabled) {
        return (element.name.toLowerCase().indexOf(val.toLowerCase())!== -1);
      } else {
        return (element.name.indexOf(val)!== -1);
      }
    });
  }

}
