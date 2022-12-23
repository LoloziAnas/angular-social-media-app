import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform{
  timeDiffs = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  };

  transform(value: string | Date): string {
    const now = Date.now();
    const then = new Date(value).getTime();
    const diff = now - then;
    if(diff < this.timeDiffs.minute){
      return 'A few seconds ago'
    }else if(diff < this.timeDiffs.hour){
      return 'A few hours ago';
    }else if( diff< this.timeDiffs.day){
      return 'A few days ago';
    }else if(diff < this.timeDiffs.week){
      return 'A few weeks ago';
    }else if(diff < this.timeDiffs.month){
      return 'A few month ago';
    }else {
      return 'A few years ago';
    }
  }

}
