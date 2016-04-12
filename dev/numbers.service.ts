import {Injectable} from 'angular2/core';
import {NUMBERS}     from './mock-numbers';

@Injectable()
export class NumbersService {
    getNumbers() {
        return Promise.resolve(NUMBERS);
    }

}
