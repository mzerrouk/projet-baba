const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const purpleNeon = getComputedStyle(document.getElementById('cadre')).boxShadow

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  document.getElementById('cadre').style.boxShadow = purpleNeon
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  heroes = ['batgirl', 'nightwing', 'hood', 'robin']
  items = document.getElementsByClassName("btn")
  for(i = 0; i < items.length; i++){
      items[i].classList.add(heroes[i])
  }
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  
  setStatusClass(document.getElementById("cadre"), correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    if(button.dataset.correct){
        let style = document.querySelector('button.correct')
        let style2 = document.getElementById('cadre')
        style2.style.boxShadow = getComputedStyle(style).boxShadow
    }
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Relancer le BaptQuiz ?'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "En quelle année débute l'histoire de Stranger Things?",
    answers: [
      { text: '1981', correct: true },
      { text: '1983', correct: false },
      { text: '1985', correct: false },
      { text: '1987', correct: false }
    ]
  },
  {
    question: "Quel film se partage les mêmes créateurs que la série Sense 8 ?",
    answers: [
      { text: 'Interstellar', correct: false },
      { text: 'Matrix', correct: true },
      { text: 'Scream', correct: false },
      { text: 'Mad Max', correct: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: false },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: true }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]