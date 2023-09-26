const history = document.querySelector("#history-operations");
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#button-container button");

class Calculator {
  constructor(history, previousOperationText, currentOperationText) {
    this.history = history;
    this.currentInput = "";
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
  }

  addDigit(digit) {
    if (currentOperationText.innerText == "" && digit === ".") {
      return;
    } else if (digit === "." && currentOperationText.innerText.includes(".")) {
      console.log(currentOperationText.innerText[0] === ".");
      return;
    }

    this.currentInput = digit; // currentInput passar a ter o valor textual do botão clicado pelo usuário
    this.updateScreen();
  }

  processOperation(operation) {
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue = null;
    let previous = this.extractNumberFromOperationText(
      this.previousOperationText.innerText
    );
    let current = +this.currentOperationText.innerText; // pega o valor atual de currentOperationText, converte para número e adiciona à current

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        console.log(operationValue, previous, current, operation);
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        if (current != 0) {
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
        } else {
          operationValue =
            "Indeterminação causada por uma tentativa de divisão por zero";
          this.updateScreen(operationValue, "");
        }
        break;
      case "mod":
        operation = " +";
        operationValue = Math.abs(current);
        this.updateScreen(operationValue, operation);
        break;
      case "x²":
        const pow = current * current;
        operationValue = previous + pow;
        console.log(operationValue);
        this.updateScreen(operationValue, "+");
        break;
      case "%":
        operationValue = current / 100;
        this.updateScreen(operationValue, "+");
        break;
      case "√":
        operation = " +";
        const sqrt = Math.sqrt(current);
        operationValue = previous + sqrt;
        this.updateScreen(operationValue, operation, sqrt, previous);
        break;
      case "π":
        operation = " +";
        operationValue = previous + Math.PI;
        console.log(operationValue, operation, Math.PI, previous);
        this.updateScreen(operationValue, operation, Math.PI, previous);
        break;
      case "DEL":
        this.clearLastDigitOnCurrentInput();
        break;
      case "CE":
        this.clearCurrentOperation();
        break;
      case "C":
        this.clearAllOperation();
        break;
      case "=":
        this.callEqualOperator();
        break;
      default:
        return;
    }
  }

  extractNumberFromOperationText(text) {
    return +text.split(" ")[0];
  }

  changeOperation(newOperation) {
    const possibleOperation = ["+", "-", "*", "/"];
    const cleanerOperaion = ["C", "CE", "DEL"];
    const parentesis = ["(", ")"];

    if (
      !possibleOperation.includes(newOperation) ||
      cleanerOperaion.includes(newOperation)
    ) {
      return;
    }

    this.previousOperationText.innerText = `${this.previousOperationText.innerText.slice(
      0,
      -2
    )} ${newOperation}`;
  }

  clearLastDigitOnCurrentInput() {
    /** Deleta o último dígito */
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  clearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  clearAllOperation() {
    this.history.innerText = "Não há histórico";
    this.clearCurrentOperation();
    this.previousOperationText.innerText = "";
  }

  callEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    console.log(operation);
    this.processOperation(operation);
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      console.log(operationValue, operation, current, previous);
      this.currentOperationText.innerText += this.currentInput; // o que for digitado será adicionado no texto do visor da calculadora
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.history.innerText = `${this.previousOperationText.innerText} ${current}`;
      this.currentOperationText.innerText = "";
    }
  }
}

const calculator = new Calculator(
  history,
  previousOperationText,
  currentOperationText
);

calculator.history.innerText = "Não há histórico";

/* Adicionar evento de clique em cada botão */
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText; // obtém o valor textual do botão clicado
    console.log(typeof value);

    // caso seja algum valor número ou o caracter .
    if (+value || +value === 0) {
      console.log(`O valor ${value} foi clicado!`);
      calculator.addDigit(value); // altera o atributo currentInput para o valor clicado pelo usuário
    } else if (value === "(" || value === ")" || value === ".") {
      console.log(`O símbolo ${value} foi clicado!`);
      calculator.addDigit(value); // altera o atributo currentInput para o valor clicado pelo usuário
      // TODO: Tratar regras de inserção de parênteses e ponto
    } else if (value === "π") {
      calculator.addDigit(Math.PI);
    } else {
      if (calculator.currentOperationText.innerText === "" && value === "-") {
        calculator.addDigit(value);
      } else {
        console.log(`A operação ${value} foi clicada!`);
        calculator.processOperation(value);
      }
    }
  });
});
