// ============================================================
// MINECRAFT BLOCK QUIZ — AP CSP Survival Guide
// ============================================================
// Block textures: InventivetalentDev/minecraft-assets on GitHub
//   https://github.com/InventivetalentDev/minecraft-assets
// Font: Press Start 2P via Google Fonts
//   https://fonts.google.com/specimen/Press+Start+2P
// These assets were NOT created by the student.
// ============================================================

// ---- Load pixel font ----
var fontLink = document.createElement("link");
fontLink.rel  = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
document.head.appendChild(fontLink);

// ---- Inject all styles ----
var style = document.createElement("style");
style.textContent = [
  "* { box-sizing:border-box; margin:0; padding:0; }",
  "body {",
  "  background:#1c1c1c;",
  "  background-image:",
  "    repeating-linear-gradient(0deg,  transparent,transparent 31px,#111 31px,#111 32px),",
  "    repeating-linear-gradient(90deg, transparent,transparent 31px,#111 31px,#111 32px);",
  "  font-family:'Press Start 2P',monospace;",
  "  display:flex; justify-content:center; align-items:center;",
  "  min-height:100vh; padding:20px; color:#fff;",
  "}",
  ".card {",
  "  background:#3b3b3b; border:4px solid #888;",
  "  box-shadow:inset 0 0 0 2px #222, 6px 6px 0 #000;",
  "  padding:28px 24px; max-width:480px; width:100%; text-align:center;",
  "}",
  "h1  { font-size:13px; color:#5dff5d; text-shadow:2px 2px #004400;",
  "      letter-spacing:1px; margin-bottom:18px; line-height:1.6; }",
  "#lblProgress { font-size:8px; color:#aaa; margin-bottom:10px; }",
  "#lblQuestion  { font-size:9px; color:#fff; margin-bottom:16px; line-height:1.8; }",
  "#imgBlock {",
  "  display:block; width:160px; height:160px; margin:0 auto 20px;",
  "  image-rendering:pixelated; border:4px solid #666;",
  "  box-shadow:3px 3px 0 #000; background:#555;",
  "}",
  ".choices { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }",
  ".btn {",
  "  background:#5a7c3a; color:#fff; border:3px solid #8ab85a;",
  "  box-shadow:3px 3px 0 #000; padding:12px 6px;",
  "  font-family:'Press Start 2P',monospace; font-size:7px;",
  "  line-height:1.6; cursor:pointer; transition:background .1s,transform .1s;",
  "}",
  ".btn:hover  { background:#6f9e4a; }",
  ".btn:active { transform:translate(2px,2px); box-shadow:1px 1px 0 #000; }",
  ".btn.correct { background:#2a8a2a; border-color:#5dff5d; }",
  ".btn.wrong   { background:#8a2a2a; border-color:#ff5d5d; }",
  "#scoreBar { font-size:7px; color:#ffdd44; text-shadow:1px 1px #664400; }",
  "#lblScore    { font-size:11px; color:#5dff5d; text-shadow:2px 2px #004400;",
  "               margin:16px 0 10px; line-height:1.8; }",
  "#lblFeedback { font-size:8px; color:#fff; line-height:1.8; margin-bottom:24px; }",
  ".restart-btn {",
  "  background:#7a4a1e; color:#fff; border:3px solid #c47a3e;",
  "  box-shadow:3px 3px 0 #000; padding:14px 20px;",
  "  font-family:'Press Start 2P',monospace; font-size:8px; cursor:pointer;",
  "  transition:background .1s,transform .1s;",
  "}",
  ".restart-btn:hover  { background:#9a6a2e; }",
  ".restart-btn:active { transform:translate(2px,2px); box-shadow:1px 1px 0 #000; }"
].join("\n");
document.head.appendChild(style);

// ---- Build the DOM ----
var card = document.createElement("div");
card.className = "card";
document.body.appendChild(card);

// -- Quiz screen --
var quizScreen = document.createElement("div");
quizScreen.id = "quizScreen";
card.appendChild(quizScreen);

var title = document.createElement("h1");
title.textContent = "MINECRAFT\nBLOCK QUIZ";
quizScreen.appendChild(title);

var lblProgress = document.createElement("p");
lblProgress.id = "lblProgress";
quizScreen.appendChild(lblProgress);

var lblQuestion = document.createElement("p");
lblQuestion.id = "lblQuestion";
quizScreen.appendChild(lblQuestion);

var imgBlock = document.createElement("img");
imgBlock.id  = "imgBlock";
imgBlock.alt = "Mystery Block";
quizScreen.appendChild(imgBlock);

var choicesDiv = document.createElement("div");
choicesDiv.className = "choices";
quizScreen.appendChild(choicesDiv);

var choiceBtns = [];
for (var b = 0; b < 4; b++) {
  var btn = document.createElement("button");
  btn.className = "btn";
  btn.dataset.index = b;
  choicesDiv.appendChild(btn);
  choiceBtns.push(btn);
}

var scoreBar = document.createElement("p");
scoreBar.id = "scoreBar";
quizScreen.appendChild(scoreBar);

// -- Results screen --
var resultsScreen = document.createElement("div");
resultsScreen.id = "resultsScreen";
resultsScreen.style.display = "none";
card.appendChild(resultsScreen);

var resTitle = document.createElement("h1");
resTitle.textContent = "RESULTS!";
resultsScreen.appendChild(resTitle);

var lblScore = document.createElement("p");
lblScore.id = "lblScore";
resultsScreen.appendChild(lblScore);

var lblFeedback = document.createElement("p");
lblFeedback.id = "lblFeedback";
resultsScreen.appendChild(lblFeedback);

var restartBtn = document.createElement("button");
restartBtn.className  = "restart-btn";
restartBtn.textContent = "PLAY AGAIN";
resultsScreen.appendChild(restartBtn);

// ============================================================
// DATA STRUCTURE: list of 5 quiz questions
// ============================================================
// Base URL for Minecraft block textures — not created by student (see citation above)
var BASE = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures/block/";

var questions = [
  {
    question: "What block is this?",
    imgUrl:   BASE + "oak_planks.png",
    choices:  ["Oak Log", "Oak Planks", "Spruce Planks", "Oak Stairs"],
    answer:   1
  },
  {
    question: "What block is this?",
    imgUrl:   BASE + "cobblestone.png",
    choices:  ["Stone Bricks", "Cobblestone", "Mossy Cobblestone", "Andesite"],
    answer:   1
  },
  {
    question: "What block is this?",
    imgUrl:   BASE + "dirt.png",
    choices:  ["Gravel", "Coarse Dirt", "Sand", "Dirt"],
    answer:   3
  },
  {
    question: "What block is this?",
    imgUrl:   BASE + "sand.png",
    choices:  ["Sandstone", "Soul Sand", "Sand", "Gravel"],
    answer:   2
  },
  {
    question: "What block is this?",
    imgUrl:   BASE + "stone.png",
    choices:  ["Diorite", "Andesite", "Cobblestone", "Stone"],
    answer:   3
  }
];

var currentQ    = 0;
var userAnswers = [];  // list storing player's selected answer indexes
var answered    = false;

// ============================================================
// REQUIRED FUNCTION: has a parameter, if-statement, and a loop
// Counts how many entries in answerList match the correct answers
// ============================================================
function countCorrect(answerList) {
  var score = 0;
  for (var i = 0; i < answerList.length; i++) {
    if (answerList[i] === questions[i].answer) {
      score = score + 1;
    }
  }
  return score;
}

// ---- Load a question onto the screen (OUTPUT) ----
function loadQuestion(qIndex) {
  answered = false;
  var q = questions[qIndex];

  lblProgress.textContent = "Question " + (qIndex + 1) + " of " + questions.length;
  lblQuestion.textContent = q.question;
  imgBlock.src = q.imgUrl;

  for (var i = 0; i < choiceBtns.length; i++) {
    choiceBtns[i].textContent = q.choices[i];
    choiceBtns[i].className   = "btn";
  }

  scoreBar.textContent = "Score: " + countCorrect(userAnswers) + " / " + questions.length;
}

// ---- Handle a player's answer click (INPUT) ----
function handleAnswer(choiceIndex) {
  if (answered) return;
  answered = true;

  var correct = questions[currentQ].answer;

  choiceBtns[choiceIndex].className += (choiceIndex === correct ? " correct" : " wrong");
  choiceBtns[correct].className += " correct";

  userAnswers.push(choiceIndex);  // store choice in the list

  setTimeout(function() {
    currentQ = currentQ + 1;
    if (currentQ < questions.length) {
      loadQuestion(currentQ);
    } else {
      showResults();
    }
  }, 700);
}

// ---- Show final results screen (OUTPUT) ----
function showResults() {
  var score = countCorrect(userAnswers);
  quizScreen.style.display    = "none";
  resultsScreen.style.display = "block";

  lblScore.textContent = "You got " + score + " out of " + questions.length + " correct!";

  if (score === 5) {
    lblFeedback.textContent = "Perfect score! You are a Minecraft master!";
  } else if (score >= 3) {
    lblFeedback.textContent = "Nice work! You know your blocks!";
  } else {
    lblFeedback.textContent = "Keep practicing! Try again!";
  }
}

// ---- Wire up button clicks ----
for (var c = 0; c < choiceBtns.length; c++) {
  (function(index) {
    choiceBtns[index].addEventListener("click", function() { handleAnswer(index); });
  })(c);
}

restartBtn.addEventListener("click", function() {
  currentQ    = 0;
  userAnswers = [];
  quizScreen.style.display    = "block";
  resultsScreen.style.display = "none";
  loadQuestion(0);
});

// ---- Start ----
loadQuestion(0);
