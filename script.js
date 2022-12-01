// score keeping
// place to store user input name
// showing whether answer was true/false
// Timer function that subtracts time when answer is incorrect
// function to generate next question
// function to end game
// when no more questions call function to end game
// when timer is over calls function that ends game

const startBtn = document.getElementById('startBtn')
const questionsContainerEle = document.getElementById('questionContainer')
const preQuestionContent = document.getElementById('preQuiz')
const questionEle = document.getElementById('question')
const answerBtnEle = document.getElementById('answerBtns')

startBtn.addEventListener('click', startQuiz)

let shuffledQuestions, currentQuestionIndex

function startQuiz() {
    startBtn.classList.add('hide')
    preQuestionContent.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    questionsContainerEle.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEle.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.addEventListener('click', selectAnswer)
        answerBtnEle.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
}

const questions = [
    {
        question: 'what is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '24', correct : false },
            { text: '9001', correct: false },
        ]
    },
]