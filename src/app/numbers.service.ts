import {Injectable} from '@angular/core';
import {NUMBERS} from './mock-numbers';
import {KinoNumber} from './kinonumber';

@Injectable()
export class NumbersService {
  getNumbers(): Promise<KinoNumber[]> {
    return Promise.resolve(NUMBERS);
  }

}
