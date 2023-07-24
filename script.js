//This is my JS for the calculator! :D

//calc class
class Calculator {
    // initializing currDisplay, prevDisplay, and clearing all prev. entries
    constructor(prevDisplay, currDisplay) {
        this.prevDisplay = prevDisplay
        this.currDisplay = currDisplay
        this.clear()
    };

    //clears current and previous operands as well as any logged operations
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    };

    //removes the right-most num in currOperand using slice method
    delete() {
        this.currOperand = this.currOperand.slice(0, -1);
    };

    //appends new number inputs to current display
    appendNum(number) {
        if (this.currOperand.includes('.') && number===".") return;
        this.currOperand = this.currOperand + number;
    };

    //handles operator inputs
    chooseOperation(operation) {
        //checks if initial operand has been inputted
        if (this.currOperand === '') return;

        //if previous operand already exists, carry out computation without hitting = and then use result as new prevOperand
        if (this.prevOperand !== '') {
            this.compute();
        };

        //log operation, transfer currOperand to prevOperand, and clear currOperand for new inputs
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    };

    //the actual calculator! :P
    compute() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }

        this.currOperand = result
        this.operation = undefined
        this.prevOperand = ''

    };

    getDisplay(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
            }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currDisplay.innerText = this.getDisplay(this.currOperand);

        if (this.operation != null) {
            this.prevDisplay.innerText = `${this.getDisplay(this.prevOperand)} ${this.operation}`
        } else {
            this.prevDisplay.innerText = '';
        }
    };
}

//variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevDisplay = document.querySelector('[data-prev-display]');
const currDisplay = document.querySelector('[data-curr-display]');

//calls a new instance of Calculator class
const calculator = new Calculator(prevDisplay, currDisplay);

//calls appendNum with the button's number (string) as the input parameter
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

//calls chooseOperation with the operators text as the input paramenter
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

//calls calc compute function when = is clicked
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

//calls calc clear function when AC is clicked
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

//calls calc delete function when DEL is clicked
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
