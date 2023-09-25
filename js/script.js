const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#button-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
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
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        if (current != 0) {
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
        } else {
          operationValue =
            "Indeterminação causada por uma tentativa de divisão por zero";
          this.updateScreen(operationValue, "", null, null);
        }
        break;
      case "mod":
        // TODO: A ser implementado
        break;
      case "x²":
        operationValue = current * current;
        console.log(operationValue);
        this.updateScreen(operationValue, operation, current, current);
        break;
      case "%":
        operationValue = previous * (previous / 100);
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "√":
        // TODO: A ser implementado
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
    const possibleOperation = ["+", "-", "*", "/", "mod", "sqrt", "pow"];
    const parentesis = ["(", ")"];

    if (!possibleOperation.includes(newOperation) && !parentesis) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + newOperation;
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
    this.clearCurrentOperation();
    this.previousOperationText.innerText = "";
  }

  callEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.history = `${previousOperationText.innerText} ${operation} ${currentOperationText.innerText}`;

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
      this.currentOperationText.innerText = "";
    }
  }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

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
    } else {
      console.log(`A operação ${value} foi clicada!`);
      calculator.processOperation(value);
    }
  });
});
