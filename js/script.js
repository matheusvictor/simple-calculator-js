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
    this.currentInput = digit; // currentInput passar a ter o valor textual do botão clicado pelo usuário
    this.updateScreen();
  }

  updateScreen() {
    this.currentOperationText.innerText += this.currentInput; // o que for digitado será adicionado no texto do visor da calculadora
  }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

/* Adicionar evento de clique em cada botão */
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText; // obtém o valor textual do botão clicado
    console.log(value);

    // caso seja algum valor número ou o caracter .
    if (parseInt(value) || value === ".") {
      console.log(`O valor ${value} foi clicado!`);
      calculator.addDigit(value); // altera o atributo currentInput para o valor clicado pelo usuário
    } else {
      console.log(`A operação ${value} foi clicada!`);
    }
  });
});
