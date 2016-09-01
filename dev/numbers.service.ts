import {Injectable} from '@angular/core';
import {NUMBERS}    from './mock-numbers';

@Injectable()
export class NumbersService {
    getNumbers(): Promise<Number[]> {
        return Promise.resolve(NUMBERS);
    }

}
