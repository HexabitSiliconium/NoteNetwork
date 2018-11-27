import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter((el) => {
                return el.name.toString().toLowerCase().indexOf(input) > -1 || 
                el.tags.toString().toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
}