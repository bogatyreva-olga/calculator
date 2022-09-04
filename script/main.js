class Calculator {
    constructor(calc) {
        this._display = new Display(calc.querySelector('.calc-display'));
        this._result = new Result(this._display);
        this._buttons = new Buttons(calc.querySelector('.buttons'), this._display, this._result);
    }
}

class Buttons {
    constructor(buttonsElement, display, result) {
        this._display = display;
        this._buttonsElement = buttonsElement;
        this._result = result;
        this._init();
    }

    _init() {
        this._buttonsElement.querySelectorAll('.btn-to-display-js').forEach((item) => {
            item.addEventListener('click', (e) => {
                this._inputSymbol(e.target.textContent)
            })
        })

        this._buttonsElement.querySelector('.btn-clear-js').addEventListener('click', this._display.clear.bind(this._display));
        this._buttonsElement.querySelector('.btn-ce-js').addEventListener('click', this._display.deleteLastSymbol.bind(this._display));
        this._buttonsElement.querySelector('.btn-result-js').addEventListener('click', () => {
            let result = this._result.getCalculateResult();
            this._display.clear();
            this._display.addToEnd(result);
        });
    }

    _inputSymbol(symbol) {
        if (symbol.match(/\d/)) {
            this._display.addToEnd(symbol);
            return;
        }
        if (symbol === '.') {
            if (this._display.getLastSymbol() === '.') {
                return;
            }

            if (this._display.getLastNumber().indexOf('.') !== -1) {
                return;
            }
            this._display.addToEnd(symbol);
            return;
        }

        if (['/', '*', '+', '%'].includes(symbol) && this._display.getLastSymbol().length === 0) {
            return;
        }

        if (this._display.getLastSymbol() === symbol) {
            return;
        }

        if (['/', '*'].includes(this._display.getLastSymbol()) && symbol === '-') {
            this._display.addToEnd(symbol);
            return;
        }

        if (['/', '*', '+'].includes(this._display.getLastSymbol()) && ['/', '*', '+', '-'].includes(symbol)) {
            this._display.deleteLastSymbol();
            this._display.addToEnd(symbol);
            return;
        }

        if (this._display.getLastSymbol() === '-') {
            return;
        }

        this._display.addToEnd(symbol);
    }
}

class Display {
    constructor(displayElement) {
        this._display = displayElement;
    }

    addToEnd(symbol) {
        this._display.textContent += symbol;
    }

    clear() {
        this._display.textContent = '';
    }

    getLastSymbol() {
        if (this._display.textContent.length === 0) {
            return '';
        }
        return this._display.textContent[this._display.textContent.length - 1];
    }

    getLastNumber() {
        let search = this._display.textContent.match(/[\d\.]+$/);
        if (search === null) {
            return '';
        }
        return search[0];
    }

    deleteLastSymbol() {
        this._display.textContent = this._display.textContent.slice(0, -1);
    }

    getAllData() {
        return this._display.textContent;
    }
}

class Result {
    constructor(display) {
        this._display = display;
    }

    getCalculateResult() {
        return eval(this._display.getAllData());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator(document.querySelector('.calc'));
})