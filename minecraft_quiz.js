// ============================================================
// MINECRAFT BLOCK QUIZ — AP CSP Survival Guide
// Block textures: InventivetalentDev/minecraft-assets (GitHub)
// Images NOT created by the student.
// ============================================================

var BASE = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures/block/";

// ---- DATA STRUCTURE: list of quiz questions ----
// imgBlock0/1/2 image URLs are set in Design Mode to match these questions
var questions = [
  { choices: ["Oak Log",     "Oak Planks"], answer: 1 },
  { choices: ["Cobblestone", "Stone"],      answer: 0 },
  { choices: ["Sand",        "Dirt"],       answer: 1 }
];

var currentQ = 0;
var userAnswers = [];

// ---- REQUIRED FUNCTION: parameter + if-statement + loop ----
function countCorrect(answerList) {
  var score = 0;
  for (var i = 0; i < answerList.length; i++) {
    if (answerList[i] === questions[i].answer) score = score + 1;
  }
  return score;
}

function loadQuestion(i) {
  var q = questions[i];
  setText("lblQ", "Q" + (i+1) + " of " + questions.length + ": What block is this?");
  hideElement("imgBlock0");
  hideElement("imgBlock1");
  hideElement("imgBlock2");
  showElement("imgBlock" + i);
  setText("btnA", q.choices[0]);
  setText("btnB", q.choices[1]);
  setText("lblScore", "Score: " + countCorrect(userAnswers) + " / " + questions.length);
}

function handleAnswer(choice) {
  userAnswers.push(choice);
  currentQ = currentQ + 1;
  if (currentQ < questions.length) {
    loadQuestion(currentQ);
  } else {
    var score = countCorrect(userAnswers);
    hideElement("imgBlock0"); hideElement("imgBlock1"); hideElement("imgBlock2");
    hideElement("lblQ"); hideElement("btnA"); hideElement("btnB"); hideElement("lblScore");
    setText("lblResult", "You got " + score + " / " + questions.length + "!  " +
      (score === 3 ? "Perfect! Minecraft master!" : score === 2 ? "Nice work!" : "Keep practicing!"));
    showElement("lblResult");
    showElement("btnRestart");
  }
}

onEvent("btnA", "click", function() { handleAnswer(0); });
onEvent("btnB", "click", function() { handleAnswer(1); });
onEvent("btnRestart", "click", function() {
  currentQ = 0; userAnswers = [];
  showElement("lblQ"); showElement("btnA"); showElement("btnB"); showElement("lblScore");
  hideElement("lblResult"); hideElement("btnRestart");
  loadQuestion(0);
});

hideElement("lblResult");
hideElement("btnRestart");
loadQuestion(0);
