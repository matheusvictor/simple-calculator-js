const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#button-container button");

/* Adicionar evento de clique em cada botão */
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText; // obtém o valor textual do botão clicado
    console.log(value);

    // caso seja algum valor número ou o caracter .
    if (parseInt(value) || value === ".") {
      console.log(`O valor ${value} foi clicado!`);
    } else {
      console.log(`A operação ${value} foi clicada!`);
    }
  });
});
