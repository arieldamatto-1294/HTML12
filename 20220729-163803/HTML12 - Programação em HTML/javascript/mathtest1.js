

  let chrono = 0;
  let chrono_active;
  let current_question = 0;
  let operand1 = [], operand2 = [], operand3 = [], operand_list = [], operand_options = ["+", "-", "x", "÷"];
  let question_total = 0;
  let user_answer = [];
  let operand_cap = [];
  let test_isActive = false;

  document.getElementById("button-abort").addEventListener("click", function() {
    test_abort();
    openSection(1);
  });
  document.getElementById("button-confirm").addEventListener("click", function() {
    question_confirm();
  });
  document.getElementById("button-print").addEventListener("click", function() {
    print();
  });
  document.getElementById("button-return").addEventListener("click", function() {
    test_abort();
    openSection(1);
  });
  document.getElementById("button-start").addEventListener("click", function() {
    openSection(2);
    test_generate();
  });

  function test_abort() { // função usada p/ abortar o teste
    chrono_reset();
    chrono = 0;
    current_question = 0;
    operand1 = []; operand2 = []; operand3 = [];
    operand_list = [];
    question_total = 0; user_answer = []; operand_cap = [];
    test_isActive = false;
  }
  function openSection(a) { // função usada p/ abrir uma certa seção do documento
    for (let i = 1; i <= 4; i++) {
      document.getElementById("section-"+i).style.display = "none";
    }
    document.getElementById("section-"+a).style.display = "flex";
  }
  function test_generate() { // usada p/ gerar as questões a compor o teste
    operand_cap.push(parseFloat(document.querySelector("#options-box > div:nth-of-type(2) > input:nth-of-type(2)").value));
    operand_cap.push(parseFloat(document.querySelector("#options-box > div:nth-of-type(2) > input:nth-of-type(3)").value));
    operand_cap.push(parseFloat(document.querySelector("#options-box > div:nth-of-type(3) > input:nth-of-type(2)").value));
    operand_cap.push(parseFloat(document.querySelector("#options-box > div:nth-of-type(3) > input:nth-of-type(3)").value));
    operand_cap.push(parseFloat(document.querySelector("#options-box > div:nth-of-type(4) > input:nth-of-type(2)").value));
    operand_cap.push(document.querySelector("#options-box > div:nth-of-type(5) > input:nth-of-type(2)").checked);
    question_total = parseFloat(document.getElementById("question-amount").value);
    for (let i = 2; i < 6; i++) {
      if (document.querySelector("#options-box > div:nth-of-type(" + i + ") > input:nth-of-type(1)").checked) {
        operand_list.push(operand_options[i-2]);
      }
    }
    if (operand_list.length == 0) { operand_list.push("+"); }
    for (let i = 0; i < question_total; i++) {
      operand2.push(operand_list[Math.floor(Math.random()*operand_list.length)]);
      if (operand2[i] == "+") {
        operand1.push(Math.floor(Math.random()*operand_cap[0]+1));
        operand3.push(Math.floor(Math.random()*(operand_cap[1]+1)));
      } else if (operand2[i] == "-") {
        operand1.push(Math.floor(Math.max((Math.random()*operand_cap[2]+1), 5)));
        operand3.push(Math.floor(Math.min((Math.random()*operand_cap[3]), operand1[i]-1, 50)));
      } else if (operand2[i] == "x") {
        operand1.push(Math.floor((Math.random()*operand_cap[4]+1)));
        operand3.push(Math.floor(Math.random()*10+1));
      } else {
        let x, y;
        let x_mult = (operand_cap[5]) ? [100, 50, 33, 25, 20, 16, 14, 12, 11, 10] : [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        y = Math.floor(Math.random()*10+1);
        x = (Math.floor(Math.random() * x_mult[y-1] + 1)*y);
        operand1.push(x);
        operand3.push(y);
      }
      user_answer.push("");
    }
    current_question = 1;
    question_change(-1);
    test_isActive = true;
    chrono_start();
  }
  function question_change(a) { // usada p/ pular a questão
    current_question += a;
    if (current_question > question_total) { current_question = question_total; }
    if (current_question < 1) { current_question = 1; }
    exe01.innerHTML = operand1[current_question-1];
    exe02.innerHTML = operand2[current_question-1];
    exe03.innerHTML = operand3[current_question-1];
    document.getElementById("question-number").innerHTML = "Questão " + current_question + "/" + question_total;
    document.getElementById("answer-input").value = user_answer[current_question-1];
  }
  function press_enter(event) { // permite usar convenientemente o botão [Enter] p/ pular questão
    if (test_isActive && (event.which == 13 || event.keyCode == 13)) {
      question_confirm();
    }
  }
  function question_confirm() { // guarda a resposta da questão atual no array de respostas
    user_answer[current_question-1] = parseFloat(document.getElementById("answer-input").value);
    if (current_question < question_total) { question_change(1); }
    else {
      test_results();
    }
  }
  function test_results() { // calcular o resultado final obtido pelo usuário
    let questions_answered = 0;
    for (let i = 0; i < question_total; i++) {
      if (user_answer[i] != "") {
        questions_answered += 1;
      }
    }
    if (questions_answered == question_total) {
      chrono_stop();
      test_isActive = false;
      openSection(3);
      setTimeout(function(){openSection(4)}, (question_total*30+1000));
      let score = 0;
      for (let i = 0; i < question_total; i++) {
        if (operand2[i] == "+") {
          if (operand1[i] + operand3[i] == user_answer[i]) {
            score += 1;
          }
        } else if (operand2[i] == "-") {
          if (operand1[i] - operand3[i] == user_answer[i]) {
            score += 1;
          }
        } else if (operand2[i] == "x") {
          if (operand1[i] * operand3[i] == user_answer[i]) {
            score += 1;
          }
        } else {
          if (operand1[i] / operand3[i] == user_answer[i]) {
            score += 1;
          }
        }
      }
      document.querySelector("#test-results > div:nth-of-type(1) > p:nth-of-type(2)").innerHTML = score + "/" + question_total;
      document.querySelector("#test-results > div:nth-of-type(2) > p:nth-of-type(2)").innerHTML = (score == question_total) ? "100%" : ((score/question_total*100).toFixed(2)) + "%";
      document.querySelector("#test-results > div:nth-of-type(3) > p:nth-of-type(2)").innerHTML = document.getElementById("chrono").innerHTML.substring(16);
      document.querySelector("#test-results > div:nth-of-type(4) > p:nth-of-type(2)").innerHTML = (question_total >= 10) ? (question_total/chrono*60).toFixed(2) : "-";
      document.querySelector("#test-results > div:nth-of-type(5) > p:nth-of-type(2)").innerHTML = (question_total >= 10) ? (score/chrono*60).toFixed(2) : "-";
    }
  }

  // Funcionamento do temporizador
  function tick() {
    chrono += 1;
    let minutes = Math.floor(chrono / 60);
    let seconds = Math.floor(chrono % 60);
    if (minutes < 10) {
      minutes = `0` + minutes;
    }
    if (seconds < 10) {
      seconds = `0` + seconds;
    }
    document.getElementById("chrono").innerHTML = "Tempo decorrido: " + minutes + ":" + seconds;
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
