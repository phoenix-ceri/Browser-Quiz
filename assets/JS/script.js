const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

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
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
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
    question: 'What is Wild HorseTail Good For?',
    answers: [
      { text: 'Helping Repair Damaged Cartilage', correct: false },
      { text: 'Make Bones Stronger', correct: false },
      { text: 'Reducing Kidney Stones', correct: false },
      { text: 'All Of These', correct: true }
    ]
  },
  {
    question: 'What Is The Best Use For Goldenrod Tea',
    answers: [
      { text: 'Allergie Relif ', correct: true },
      { text: 'Wound Healing', correct: false },
      { text: 'Fixing Broken Bones', correct: false },
      { text: 'Back Pain', correct: false }
    ]
  },
  {
    question: 'How Do You Use Broadleaf Plantain To Speed Up Wound Healing ',
    answers: [
      { text: 'Chew Into Paste And Place On Wound', correct: true },
      { text: 'Salve', correct: true },
      { text: 'You Dont', correct: false },
      { text: 'What Is This', correct: false }
    ]
  },
  {
    question: 'What Can The Cordyceps Fungus Do?',
    answers: [
      { text: 'Make Human Zombies', correct: false },
      { text: 'Make Bones Heal Faster', correct: false },
      { text: 'Help Treat Cronic Bronchitis Or Other Resp. Issues,', correct: true },
      { text: 'Make You Cry', correct: false }
    ]
  }
]

