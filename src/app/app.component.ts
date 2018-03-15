import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {NumbersService} from './numbers.service';
import {KinoNumber} from './kinonumber';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    numbers: KinoNumber[];
    selectedNumbers: number[] = [];
    systemChosenNumbers: number[] = [];

    constructor(private _numbersService: NumbersService) { }

    ngOnInit(): any {
        this._numbersService.getNumbers().then(numbers => this.numbers = numbers);
    }

    getNextNumber() {
        let num = Math.floor(Math.random() * 81);

        while (this.systemChosenNumbers.indexOf(num) > -1 || (num === 0)) {
            num = Math.floor(Math.random() * 81);
        }
        return num;
    }

    addNumber(num) {
        if (this.selectedNumbers.length < 10) {
            if (this.selectedNumbers.indexOf(num.id) < 0) {
                this.selectedNumbers.push(num.id);
                num.toggle();
            }
        }
        if (this.selectedNumbers.length === 10) {
            this.selectedNumbers.push(-1);

            Observable.interval(1500)
                .take(20)
                .subscribe((x) => {
                    let chosenNums: KinoNumber[] = [];
                    Observable.interval(400).take(3).subscribe((t) => {

                      const finalChoice = this.getNextNumber();
                        if (chosenNums.length > 0) {
                            chosenNums[0].isChosen = false;
                            chosenNums = [];
                        }
                      let num = this.numbers.find(nm => nm.id === finalChoice);
                        num.isChosen = true;
                        chosenNums.push(num);
                        if (t === 2) {
                            this.systemChosenNumbers.push(finalChoice);
                          let num = this.numbers.find(nm => nm.id === finalChoice);
                            num.isChosen = true;
                            if (this.selectedNumbers.find(id => id === finalChoice)) {
                                num.isMatched = true;
                            }
                        }
                    });
                });
        }
    }
}
