//**************** QUIZ ELEMENTS ****************//

const startBtn = document.querySelector("#startBtn");
const questionsContainerEle = document.querySelector("#questionContainer");
const preQuestionContent = document.querySelector("#preQuiz");
const questionEle = document.querySelector("#question");
const answersEle = document.querySelector("#answers");
const timerEle = document.querySelector("#timer");

//**************** INITIAL/HIGHSCORE ****************//

const inputScoreEl = document.querySelector("#inputScore");
const initialsEl = document.querySelector("#initials");
const submitHScoreEl = document.querySelector("#submitInitials");
const userScoreEl = document.querySelector("#score");
//**************** HIGH SCORE ELEMENTS ****************//

const highScoresEl = document.querySelector("#highScores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#goBack");
const clearScoresBtnEl = document.querySelector("#clearScores");
const viewHScoresBtnEl = document.querySelector("#viewHScores");

//**************** VARIABLES ****************//

let score = 0;
let currentQuestion = 0;
let highScores = [];
let interval;
let timeGiven = 120;
let timeGone = 0;

//****************EVENT LISTENERS****************//

startBtn.addEventListener("click", function () {
  hide(preQuestionContent);
  timerStart();
  showQuestion();
  show(questionsContainerEle);
});

answersEle.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    checkAnswer(e.target);
    setNextQuestion();
  }
});

viewHScoresBtnEl.addEventListener("click", function () {
  hide(preQuestionContent);
  hide(questionsContainerEle);
  hide(inputScoreEl);
  renderHighScores();
  stopTimer();
  reset();
});

submitHScoreEl.addEventListener("click", function () {
  let initValue = initialsEl.value.trim();
  if (initValue) {
    let userScore = { username: initValue, userScore: score };
    initialsEl.value = "";
    highScores = JSON.parse(localStorage.getItem("scores")) || [];
    highScores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
    hide(inputScoreEl);
    renderHighScores();
    reset();
  }
});

goBackBtnEl.addEventListener("click", function () {
  hide(highScoresEl);
  show(preQuestionContent);
});

clearScoresBtnEl.addEventListener("click", function () {
  highScores = [];
  localStorage.setItem("scores", JSON.stringify(highScores));
  renderHighScores();
});

//**************** EVENT LISTENER ENDS****************//

//**************** FUNCTIONS FOR TIMER AND QUESTION GENERATING****************//

function timerStart() {
  timerEle.textContent = timeGiven;
  interval = setInterval(function () {
    timeGone++;
    timerEle.textContent = timeGiven - timeGone;
    if (timeGone >= timeGiven) {
      currentQuestion = questions.length;
      setNextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function setNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    stopTimer();
    if (timeGiven - timeGone > 0) score += timeGiven - timeGone;
    userScoreEl.textContent = score;
    hide(questionsContainerEle);
    show(inputScoreEl);
    timerEle.textContent = 0;
  }
}

function showQuestion() {
  questionEle.textContent = questions[currentQuestion].title;
  for (i = 0; i < answersEle.children.length; i++) {
    answersEle.children[i].textContent = questions[currentQuestion].choices[i];
  }
}

//**************** FUNCTIONS FOR TIMER AND QUESTION GENERATING ENDS ****************//

//**************** CHECKING IF ANSWER IS TRUE/FALSE & DISPLAY MESSAGE ****************//

function checkAnswer(answer) {
  if (
    questions[currentQuestion].answer == questions[currentQuestion].choices[answer.id]
  ) {
    score += 5;
    dispMessage("Correct!");
  } else {
    timeGone += 10;
    dispMessage("Wrong...");
  }
}

function dispMessage(m) {
  let messageHr = document.createElement("hr");
  let messageEl = document.createElement("div");
  messageEl.textContent = m;
  document.querySelector(".container").appendChild(messageHr);
  document.querySelector(".container").appendChild(messageEl);
  setTimeout(function () {
    messageHr.remove();
    messageEl.remove();
  }, 2000);
}

//**************** CHECKING IF ANSWER IS TRUE/FALSE & DISPLAY MESSAGE ENDS ****************//

//**************** RENDERS HIGH SCORES ****************//

function renderHighScores() {
  scoresEl.innerHTML = "";
  show(highScoresEl);
  highScores = JSON.parse(localStorage.getItem("scores"));
  for (let i = 0; i < highScores.length; i++) {
    let scoreItem = document.createElement("div");
    scoreItem.setAttribute("style", "background-color: violet;");
    scoreItem.textContent = `${i + 1}. ${highScores[i].username} - ${
      highScores[i].userScore
    }`;
    scoresEl.appendChild(scoreItem);
  }
}

//**************** USED TO HIDE/DISPLAY/RESET ELEMENTS ****************//

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

function reset() {
  score = 0;
  currentQ = 0;
  secondsElapsed = 0;
  timerEle.textContent = 0;
}

//**************** USED TO HIDE/DISPLAY/RESET ELEMENTS END ****************//

//**************** QUESTIONS TO BE RENDERED ****************//

const questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },

  {
    title: "Javascript is an _______ language?",
    choices: [
      "Object-oriented",
      "Object-Based",
      "procedural",
      "none of the above",
    ],
    answer: "Object-oriented",
  },
  {
    title:
      "Which of the following keywords is used to define a variable in Javascript",
    choices: ["var", "let", "const", "all of the above"],
    answer: ["all of the above"],
  },
];
