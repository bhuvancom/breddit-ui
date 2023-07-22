import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rdate',
})
export class MyDatePipe implements PipeTransform {
    constructor() { }

    transform(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMilliseconds = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const diffInMonths =
            now.getMonth() -
            date.getMonth() +
            12 * (now.getFullYear() - date.getFullYear());
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
        if (diffInDays === 0) {
            return 'Today at ' + time;
        } else if (diffInDays === 1) {
            return '1 day ago  at ' + time;
        } else if (diffInMonths === 0) {
            return `${diffInDays} days ago at ` + time;
        } else {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(date, 'MMM d, y, h:mm a') ?? dateString;
        }
    }
}
