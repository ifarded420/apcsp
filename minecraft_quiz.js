// ============================================================
// MINECRAFT BLOCK QUIZ — AP CSP Survival Guide
// ============================================================
// Images sourced from the Minecraft Wiki (https://minecraft.wiki)
// These images were NOT created by the student.
// ============================================================

// ---- DATA STRUCTURE: list of 5 quiz questions ----
var questions = [
  {
    question: "What block is this?",
    imgUrl: "https://minecraft.wiki/images/Oak_Planks_JE4.png",
    choices: ["Oak Log", "Oak Planks", "Spruce Planks", "Oak Stairs"],
    answer: 1
  },
  {
    question: "What block is this?",
    imgUrl: "https://minecraft.wiki/images/Cobblestone_JE6.png",
    choices: ["Stone Bricks", "Cobblestone", "Mossy Cobblestone", "Andesite"],
    answer: 1
  },
  {
    question: "What block is this?",
    imgUrl: "https://minecraft.wiki/images/Dirt_JE2.png",
    choices: ["Gravel", "Coarse Dirt", "Sand", "Dirt"],
    answer: 3
  },
  {
    question: "What block is this?",
    imgUrl: "https://minecraft.wiki/images/Sand_JE3.png",
    choices: ["Sandstone", "Soul Sand", "Sand", "Gravel"],
    answer: 2
  },
  {
    question: "What block is this?",
    imgUrl: "https://minecraft.wiki/images/Stone_JE4.png",
    choices: ["Diorite", "Andesite", "Cobblestone", "Stone"],
    answer: 3
  }
];

var currentQ = 0;       // tracks which question we're on
var userAnswers = [];   // list that stores the player's selected answer indexes

// ---- REQUIRED FUNCTION: has a parameter, if-statement, and loop ----
// Counts how many answers in answerList match the correct answers
function countCorrect(answerList) {
  var score = 0;
  // Loop through every answer the player gave
  for (var i = 0; i < answerList.length; i++) {
    // If their answer matches the correct index, add a point
    if (answerList[i] === questions[i].answer) {
      score = score + 1;
    }
  }
  return score;
}

// ---- Load a question onto the quiz screen ----
function loadQuestion(qIndex) {
  var q = questions[qIndex];
  setText("lblQuestion",
    "Question " + (qIndex + 1) + " of " + questions.length + ":  " + q.question);
  setProperty("imgBlock", "image-url", q.imgUrl);
  setText("btnA", q.choices[0]);
  setText("btnB", q.choices[1]);
  setText("btnC", q.choices[2]);
  setText("btnD", q.choices[3]);
  setText("lblProgress", "Score so far: " + countCorrect(userAnswers));
}

// ---- Called when the player clicks an answer button ----
function handleAnswer(choiceIndex) {
  userAnswers.push(choiceIndex);  // store their choice in the list
  currentQ = currentQ + 1;

  if (currentQ < questions.length) {
    loadQuestion(currentQ);       // more questions left — show next one
  } else {
    showResults();                // all done — show the results
  }
}

// ---- Show the final results screen ----
function showResults() {
  var score = countCorrect(userAnswers);  // use our function to count correct
  setScreen("resultsScreen");
  setText("lblScore", "You got " + score + " out of " + questions.length + " correct!");

  if (score === 5) {
    setText("lblFeedback", "Perfect score!  You are a Minecraft master!");
  } else if (score >= 3) {
    setText("lblFeedback", "Nice work!  You know your blocks!");
  } else {
    setText("lblFeedback", "Keep practicing!  Try again!");
  }
}

// ---- Button event listeners (INPUT) ----
onEvent("btnA", "click", function() { handleAnswer(0); });
onEvent("btnB", "click", function() { handleAnswer(1); });
onEvent("btnC", "click", function() { handleAnswer(2); });
onEvent("btnD", "click", function() { handleAnswer(3); });

onEvent("btnRestart", "click", function() {
  currentQ = 0;
  userAnswers = [];
  setScreen("quizScreen");
  loadQuestion(0);
});

// ---- Start the quiz ----
loadQuestion(0);
