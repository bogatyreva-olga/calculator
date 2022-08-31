class Calculator {
    constructor(calc) {
        this.root = calc;
        this.buttons = new Buttons(calc.buttons);
    }
}

class Buttons {
    constructor(divBtns) {
        divBtns.querySelectorAll('.btn-number').forEach((item) => {
            item.addEventListener('click', (e) => {
                console.log(e.target.textContent)
            })
        })
    }


}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator(document.querySelector('.calc'));
})