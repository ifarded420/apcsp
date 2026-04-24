// ============================================================
// MINECRAFT BLOCK QUIZ — AP CSP Survival Guide
// ============================================================
// Block textures: InventivetalentDev/minecraft-assets on GitHub
//   https://github.com/InventivetalentDev/minecraft-assets
// These images were NOT created by the student.
// ============================================================

// Base URL for block textures — external asset, not created by student
var BASE = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures/block/";

// ---- DATA STRUCTURE: list of 5 quiz questions ----
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

// ---- Build UI with App Lab functions ----

// Title
textLabel("lblTitle", "MINECRAFT BLOCK QUIZ");
setPosition("lblTitle", 0, 10, 320, 25);
setProperty("lblTitle", "font-size", "14px");
setProperty("lblTitle", "text-align", "center");
setProperty("lblTitle", "font-weight", "bold");

// Progress line
textLabel("lblProgress", "");
setPosition("lblProgress", 0, 40, 320, 20);
setProperty("lblProgress", "font-size", "11px");
setProperty("lblProgress", "text-align", "center");

// Block image (OUTPUT)
image("imgBlock", "");
setPosition("imgBlock", 80, 65, 160, 160);

// Answer buttons (INPUT) — 2x2 grid
button("btnA", "");
setPosition("btnA", 10, 235, 145, 50);

button("btnB", "");
setPosition("btnB", 165, 235, 145, 50);

button("btnC", "");
setPosition("btnC", 10, 295, 145, 50);

button("btnD", "");
setPosition("btnD", 165, 295, 145, 50);

// Running score bar
textLabel("lblScoreBar", "Score: 0 / 5");
setPosition("lblScoreBar", 0, 355, 320, 20);
setProperty("lblScoreBar", "font-size", "11px");
setProperty("lblScoreBar", "text-align", "center");

// ---- Results elements (hidden until quiz ends) ----
textLabel("lblFinalScore", "");
setPosition("lblFinalScore", 0, 130, 320, 40);
setProperty("lblFinalScore", "font-size", "13px");
setProperty("lblFinalScore", "text-align", "center");
setProperty("lblFinalScore", "font-weight", "bold");
hideElement("lblFinalScore");

textLabel("lblFeedback", "");
setPosition("lblFeedback", 0, 185, 320, 50);
setProperty("lblFeedback", "font-size", "11px");
setProperty("lblFeedback", "text-align", "center");
hideElement("lblFeedback");

button("btnRestart", "PLAY AGAIN");
setPosition("btnRestart", 85, 250, 150, 50);
hideElement("btnRestart");

// ---- Load a question onto the screen ----
function loadQuestion(qIndex) {
  var q = questions[qIndex];
  setText("lblProgress", "Question " + (qIndex + 1) + " of " + questions.length + " — " + q.question);
  setProperty("imgBlock", "image-url", q.imgUrl);
  setText("btnA", q.choices[0]);
  setText("btnB", q.choices[1]);
  setText("btnC", q.choices[2]);
  setText("btnD", q.choices[3]);
  setText("lblScoreBar", "Score: " + countCorrect(userAnswers) + " / " + questions.length);
}

// ---- Handle an answer button click (INPUT) ----
function handleAnswer(choiceIndex) {
  userAnswers.push(choiceIndex);  // add choice to list
  currentQ = currentQ + 1;
  if (currentQ < questions.length) {
    loadQuestion(currentQ);
  } else {
    showResults();
  }
}

// ---- Show final results (OUTPUT) ----
function showResults() {
  // Hide quiz elements
  hideElement("imgBlock");
  hideElement("btnA");
  hideElement("btnB");
  hideElement("btnC");
  hideElement("btnD");
  hideElement("lblScoreBar");
  hideElement("lblProgress");

  // Show results elements
  var score = countCorrect(userAnswers);
  setText("lblFinalScore", "You got " + score + " out of " + questions.length + " correct!");

  if (score === 5) {
    setText("lblFeedback", "Perfect score! You are a Minecraft master!");
  } else if (score >= 3) {
    setText("lblFeedback", "Nice work! You know your blocks!");
  } else {
    setText("lblFeedback", "Keep practicing! Try again!");
  }

  showElement("lblFinalScore");
  showElement("lblFeedback");
  showElement("btnRestart");
}

// ---- Button event listeners ----
onEvent("btnA", "click", function() { handleAnswer(0); });
onEvent("btnB", "click", function() { handleAnswer(1); });
onEvent("btnC", "click", function() { handleAnswer(2); });
onEvent("btnD", "click", function() { handleAnswer(3); });

onEvent("btnRestart", "click", function() {
  currentQ    = 0;
  userAnswers = [];
  showElement("imgBlock");
  showElement("btnA");
  showElement("btnB");
  showElement("btnC");
  showElement("btnD");
  showElement("lblScoreBar");
  showElement("lblProgress");
  hideElement("lblFinalScore");
  hideElement("lblFeedback");
  hideElement("btnRestart");
  loadQuestion(0);
});

// ---- Start the quiz ----
loadQuestion(0);
