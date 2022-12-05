// score keeping
// place to store user input name
// showing whether answer was true/false
// Timer function that subtracts time when answer is incorrect
// function to generate next question
// function to end game
// when no more questions call function to end game
// when timer is over calls function that ends game

const startBtn = document.querySelector('#startBtn')
const questionsContainerEle = document.querySelector('#questionContainer')
const preQuestionContent = document.querySelector('#preQuiz')
const questionEle = document.querySelector('#question')
const answersEle = document.querySelector('#answers')
const timerEle = document.querySelector('#timer')

const inputScoreEl = document.querySelector("#inputScore");
const initialsEl = document.querySelector("#initials");
const submitInitialsBtnEl = document.querySelector("#submitInitials");
const userScoreEl = document.querySelector("#score");

const highScoresEl = document.querySelector("#highScores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#goBack");
const clearScoresBtnEl = document.querySelector("#clearScores");
const viewHScoresBtnEl = document.querySelector("#viewHScores");

let score = 0;
let currentQuestion = 0;
let highScores = [];
let interval;
let timeGiven = 120;
let timeGone = 0;

startBtn.addEventListener('click', function () {
    hide(preQuestionContent)
    timerStart()
    showQuestion()
    show(questionsContainerEle)
})

answersEle.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        setNextQuestion();
    }
});

function timerStart () {
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
    clearInterval(interval)
}


function setNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
    showQuestion();
    } else {
        stopTimer();
        if((timeGiven - timeGone) > 0)
            score += (timeGiven - timeGone);
        userScoreEl.textContent = score;
        hide(questionsContainerEle)
        show(inputScoreEl)
        timerEle.textContent = 0;
    }
}

function checkAnswer(answer) {
    if (questions[currentQuestion].answer == questions[currentQuestion].choices[answer.id]) {
        score += 5;
        displayMessage("Correct!");
    }
    else {
        timeGone += 10;
        displayMessage("Wrong...");
    }
}

function displayMessage(m) {
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


function showQuestion() {
    questionEle.textContent = questions[currentQuestion].title;
    for (i = 0; i < answersEle.children.length; i++) {
        answersEle.children[i].textContent = questions[currentQuestion].choices[i]
    }
}

//hides element
function hide(element) {
    element.style.display = "none";
}

//displays element
function show(element) {
    element.style.display = "block";
}

function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEle.textContent = 0;
}

viewHScoresBtnEl.addEventListener("click", function () {
    hide(preQuestionContent);
    hide(questionsContainerEle);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    }
]