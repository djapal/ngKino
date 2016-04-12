import {Component} from 'angular2/core';
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {NumbersService} from "./numbers.service";
import {KinoNumber} from "./kinonumber";
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        <h1>Angular 2 Kino</h1>
        <label>{{leftText}}</label>
        <div class="container">
            <div *ngFor="#num of numbers" class="col-md-15">
                <div class="kino-number-default" [ngClass]="{'kino-number-selected': num.isSelected, 'kino-number-chosen': num.isChosen, 'kino-number-matched': num.isMatched}" (click)="addNumber(num)">{{num.id}}<div>
            </div>
        </div>
    `,
})
export class AppComponent implements OnInit {
    numbers: KinoNumber[];
    selectedNumbers: number[] = [];
    systemChosenNumbers: number[] = [];
    leftText: string;

    constructor(private _numbersService: NumbersService) { }

    ngOnInit():any {
        this._numbersService.getNumbers().then(numbers => this.numbers = numbers);
    }

    getNextNumber() {
        var num = Math.floor(Math.random() * 81);

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
        if (this.selectedNumbers.length == 10) {
            this.selectedNumbers.push(-1);
/*            Observable.interval(1000).take(8).subscribe((t) => {
                console.log('xxxxxxx ' + t);
                Observable.interval(300)
                    .take(3)
                    .subscribe((x) => {
                        console.log('-------- ' + x, new Date());
                    });
            });*/


            Observable.interval(1500)
                .take(20)
                .subscribe((x) => {
                    var chosenNums : KinoNumber[] = [];
                    Observable.interval(400).take(3).subscribe((t) => {

                        var finalChoice = this.getNextNumber();
                        if (chosenNums.length > 0) {
                            chosenNums[0].isChosen = false;
                            chosenNums = [];
                        }
                        var num = this.numbers.find(nm => nm.id === finalChoice);
                        num.isChosen = true;
                        chosenNums.push(num);
                        console.log('finalChoice ', finalChoice);
                        if (t === 2) {
                            this.systemChosenNumbers.push(finalChoice);
                            /*                    var y = Math.floor(Math.random() * 81);

                             while (this.systemChosenNumbers.indexOf(y) > -1 || (y === 0)) {
                             y = Math.floor(Math.random() * 81);
                             }*/

                            console.log(finalChoice, finalChoice in this.systemChosenNumbers);

                            var num = this.numbers.find(nm => nm.id === finalChoice);
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
