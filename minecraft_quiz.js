// ============================================================
// MINECRAFT BLOCK QUIZ — AP CSP Survival Guide
// Block textures: InventivetalentDev/minecraft-assets (GitHub)
// Images NOT created by the student.
// ============================================================

var BASE = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures/block/";

// ---- DATA STRUCTURE: list of quiz questions ----
var questions = [
  { imgUrl: BASE+"oak_planks.png",  choices: ["Oak Log",     "Oak Planks"], answer: 1 },
  { imgUrl: BASE+"cobblestone.png", choices: ["Cobblestone", "Stone"],      answer: 0 },
  { imgUrl: BASE+"dirt.png",        choices: ["Sand",        "Dirt"],       answer: 1 }
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

// Delete leftovers from any previous run, then rebuild fresh.
// First run: warns elements don't exist (harmless). Every run after: clean.
deleteElement("lblQ");
deleteElement("imgBlock");
deleteElement("btnA");
deleteElement("btnB");
deleteElement("lblScore");
deleteElement("lblResult");
deleteElement("btnRestart");

textLabel("lblQ", "");
setPosition("lblQ", 0, 10, 320, 20);
setProperty("lblQ", "font-size", 11);
setProperty("lblQ", "text-align", "center");

image("imgBlock", "");
setPosition("imgBlock", 80, 35, 160, 160);

button("btnA", "");
setPosition("btnA", 10, 205, 145, 50);

button("btnB", "");
setPosition("btnB", 165, 205, 145, 50);

textLabel("lblScore", "");
setPosition("lblScore", 0, 265, 320, 20);
setProperty("lblScore", "font-size", 11);
setProperty("lblScore", "text-align", "center");

textLabel("lblResult", "");
setPosition("lblResult", 0, 150, 320, 60);
setProperty("lblResult", "font-size", 12);
setProperty("lblResult", "text-align", "center");
hideElement("lblResult");

button("btnRestart", "PLAY AGAIN");
setPosition("btnRestart", 85, 220, 150, 50);
hideElement("btnRestart");

function loadQuestion(i) {
  var q = questions[i];
  setText("lblQ", "Q" + (i+1) + " of " + questions.length + ": What block is this?");
  deleteElement("imgBlock");
  image("imgBlock", q.imgUrl);
  setPosition("imgBlock", 80, 35, 160, 160);
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
    hideElement("lblQ"); hideElement("imgBlock");
    hideElement("btnA"); hideElement("btnB"); hideElement("lblScore");
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
  showElement("lblQ"); showElement("btnA");
  showElement("btnB"); showElement("lblScore");
  hideElement("lblResult"); hideElement("btnRestart");
  loadQuestion(0);
});

loadQuestion(0);
