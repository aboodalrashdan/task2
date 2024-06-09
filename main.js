class CalculatorEngine {
    constructor() {
        this.logArray = [];
    }

    calculate(firstNumber, operator, secondNumber) {
        let result;
        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                result = firstNumber / secondNumber;
                break;
            default:
                result = 'Error';
        }
        this.logArray.push({ firstNumber, operator, secondNumber, result });
        return result;
    }

    getLog() {
        return this.logArray;
    }
}

class CalculatorUI {
    constructor() {
        this.display = document.getElementById('display');
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        this.currentNumber = '';
        this.fullExpression = ''; 
        this.engine = new CalculatorEngine();
        this.init();
    }

    init() {
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', (e) => this.handleNumber(e));
        });

        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', (e) => this.handleOperator(e));
        });

        document.getElementById('equal').addEventListener('click', () => this.handleEqual());
        document.getElementById('clear').addEventListener('click', () => this.handleClear());
    }

    handleNumber(event) {
        this.currentNumber += event.target.getAttribute('data-number');
        this.fullExpression += event.target.getAttribute('data-number');
        this.updateDisplay(this.fullExpression);
    }

    handleOperator(event) {
        if (this.firstNumber === '') {
            this.firstNumber = this.currentNumber;
            this.currentNumber = '';
        }
        this.operator = event.target.getAttribute('data-operator');
        this.fullExpression += ' ' + this.operator + ' ';
        this.updateDisplay(this.fullExpression);
    }

    handleEqual() {
        this.secondNumber = this.currentNumber;
        const result = this.engine.calculate(
            parseFloat(this.firstNumber),
            this.operator,
            parseFloat(this.secondNumber)
        );
        this.fullExpression += ' = ' + result;
        this.updateDisplay(this.fullExpression);
        this.currentNumber = '';
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        this.fullExpression = '';
    }

    handleClear() {
        this.currentNumber = '';
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        this.fullExpression = ''; 
        this.updateDisplay('');
    }

    updateDisplay(content) {
        this.display.textContent = content;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CalculatorUI();
});

