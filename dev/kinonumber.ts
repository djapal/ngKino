export class KinoNumber {
    id: number;
    isSelected = false;
    isChosen = false;
    isMatched = false;

    constructor(id: number) {
        this.id = id;
    }

    toggle() {
        this.isSelected = !this.isSelected;
    }
}