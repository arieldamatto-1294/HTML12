

console.log("Hello World!");

let chrono = 60;
let score = 0;
let user_answer = [];
let element_seq = [];
let color_names = [
  "Preto", "Vermelho", "Verde", "Azul", "Amarelo", "Magenta", "Ciano",
  "cor-laranja", "cor-índigo", "Cinza", "Marrom", "Roxo"
];
let color_values = [
  "cor-preto", "cor-vermelho", "cor-verde", "cor-azul", "cor-amarelo", "cor-magenta", "cor-ciano",
  "cor-laranja", "cor-índigo", "cor-cinza", "cor-marrom", "cor-roxo"
];
let test_isActive = false;

document.getElementById("button-start").addEventListener("click", function() {
  test_isActive = true;
  open_section(2);
  color_pickup();
  chrono_start();
});
for (let i = 1; i <= 12; i++) {
  document.querySelector("#button-option > div:nth-of-type(" + i + ")").addEventListener("click", function() {
    answer_confirm(i);
  });
}

function open_section(a) { // função usada p/ abrir uma certa seção do documento
  for (let i = 1; i <= 3; i++) {
    document.getElementById("section-"+i).style.display = "none";
  }
  document.getElementById("section-"+a).style.display = "flex";
}
function color_pickup() { // sorteia o texto e a cor a ser usada p/ colori-lo
  let rng = Math.floor(Math.random() * 132 + 1);
  for (let i = 1; i <= 132; i++) {
    document.querySelector("#color-txt > p:nth-of-type(" + i + ")").style.display = "none";
  }
  document.querySelector("#color-txt > p:nth-of-type(" + (rng) + ")").style.display = "block";
  element_seq.push(rng);
}
function answer_confirm(a) {
  user_answer.push(a);
  color_pickup();
}
/*
function press_enter(event) { // permite usar convenientemente o botão [Enter] p/ pular questão
  if (test_isActive && (event.which == 13 || event.keyCode == 13)) {
    answer_confirm();
    color_pickup();
  }
}
*/
function score_check() {
  let value1 = "", value2 = "";
  for (let i = 0; i < user_answer.length; i++) {
    value1 = user_answer[i];
    value2 = Math.floor((element_seq[i] - 1) / 11 + 1);
    if (value1 == value2) { score += 1; }
  }
  document.getElementById("final-score").innerHTML = score;
  console.log("Acertos: " + score + "/" + user_answer.length + " (" + (score/user_answer.length*100) + "%)");
}
  open_section(1);


// Abaixo estão as funções do temporizador:

function tick() {
  chrono -= 1;
  if (chrono < 0) {
    chrono_stop();
    open_section(3);
    score_check();
  }
  let minutes = Math.floor(chrono / 60);
  let seconds = Math.floor(chrono % 60);
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  if (seconds < 10) {
    seconds = `0` + seconds;
  }
  document.getElementById("timer").innerHTML = "Tempo restante: " + minutes + ":" + seconds;
}
function chrono_display() {
  let minutes = Math.floor(chrono / 60);
  let seconds = Math.floor(chrono % 60);
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  if (seconds < 10) {
    seconds = `0` + seconds;
  }
  chrono.innerHTML = minutes + ":" + seconds;
}
function chrono_start() {
  chrono_active = setInterval(tick, 1000);
}
function chrono_stop() {
  clearInterval(chrono_active);
}
function chrono_reset() {
  clearInterval(chrono_active);
  chrono = 0;
  tick();
}