import {Injectable, Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'appfilter'
})
@Injectable()
export class AppFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.id.indexOf(args[0]) !== -1);
    }
}