import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name:'shorten'
})
export class ShortenPipe implements PipeTransform{

  transform(value: string, maxLenght = 50): string {
    if(value.length <= maxLenght) return value;
    return value.substring(0, maxLenght)+'...';
  }

}
