let order = [];
let clickedOrder = [];
let score = 0;

/*
 * 0 - verde
 * 1 - vermelho
 * 2 - amarelo
 * 3 - azul
 */

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

/**
 * @author Barbara Reis
 * @description Cria ordem aleatorioa de cores
 */
let shufflerOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    ligthColor(elementColor, Number(i) + 1);
  }
};

/**
 * @author Barbara Reis
 * @param {Array} element
 * @param {number} number
 * @description Acende a proxima cor
 */
let ligthColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);

  setTimeout(() => {
    element.classList.remove("selected");
  });
};

/**
 * @author Barbara Reis
 * @description Checa se os botoes clicados são os mesmo da ordem gerado no jogo
 */
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\n Você acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

/**
 ** @author Barbara Reis
 * @description  Função para o clique do usuario
 * @param {string} color
 */
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};

/**
 * Função que retorna color
 *
 * @param {number} color recebe a cor
 * @return {*}
 */
let createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    default:
      return blue;
  }
};

/**
 * Função para o proximo level
 *
 * @author Barbara Reis
 */
let nextLevel = () => {
  score++;
  shufflerOrder();
};

/**
 * Função para game over
 *
 * @author Barbara Reis
 */
let gameOver = () => {
  alert(
    `Pontuação ${score}.\n Você perdeu o jogo! =( \n Clique em 'Ok' para iniciar um novo)`
  );
  order = [];
  clickedOrder = [];
  playGame();
};

/**
 * Função para iniciar um novo jogo
 *
 * @author Barbara Reis
 */
let playGame = () => {
  alert(`Bem vindo ao Genius! Iniciando um novo jogo.`);
  score = 0;

  nextLevel();
};

red.onclick = () => click(1);
blue.onclick = () => click(3);
green.onclick = () => click(0);
yellow.onclick = () => click(2);

playGame();
