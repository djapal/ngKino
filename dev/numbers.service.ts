import {Injectable} from '@angular/core';
import {NUMBERS}     from './mock-numbers';

@Injectable()
export class NumbersService {
    getNumbers() {
        return Promise.resolve(NUMBERS);
    }

}
