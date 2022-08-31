class Calculator {
    constructor(calc) {
        this._display = new Display(calc.querySelector('.calc-display'));
        this._buttons = new Buttons(calc.querySelector('.buttons'), this._display);
    }
}

class Buttons {
    constructor(buttonsElement, display) {
        this._display = display;
        this._buttonsElement = buttonsElement;
        this.init();
    }

    init() {
        this._buttonsElement.querySelectorAll('.btn-to-display-js').forEach((item) => {
            item.addEventListener('click', (e) => {
                this.inputSymbol(e.target.textContent)
            })
        })
        this._buttonsElement.querySelector('.btn-clear-js').addEventListener('click', () => {
            this._display.clear();
        })
    }

    inputSymbol(symbol) {
        if (symbol.match(/\d/)) {
            this._display.addTo(symbol);
            return;
        }
        if (symbol === '.') {
            if (this._display.getLastSymbol() === '.') {
                return;
            }

            if (this._display.getLastNumber().indexOf('.') !== -1) {
                return;
            }
            this._display.addTo(symbol);
            return;
        }
        this._display.addTo(symbol);
    }
}

class Display {
    constructor(displayElement) {
        this._display = displayElement;
    }

    addTo(symbol) {
        this._display.textContent += symbol;
    }

    clear() {
        this._display.textContent = '';
    }

    getLastSymbol() {
        return this._display.textContent[this._display.textContent.length - 1]
    }

    getLastNumber() {
        let search = this._display.textContent.match(/[\d\.]+$/);
        if (search === null) {
            return '';
        }
        return search[0];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator(document.querySelector('.calc'));
})