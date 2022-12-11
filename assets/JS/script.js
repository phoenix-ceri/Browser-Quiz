const startButton              = document.getElementById('start-btn'         ) ;
const nextButton               = document.getElementById('next-btn'          ) ;
const endButton                = document.getElementById('end-btn'           ) ;
const questionContainerElement = document.getElementById('question-container') ;
const timeRemainingElement     = document.getElementById('time-remaining'    ) ;
const questionElement          = document.getElementById('question'          ) ;
const answerButtonsElement     = document.getElementById('answer-buttons'    ) ;

let shuffledQuestions    ,
    currentQuestionIndex ;


// Variable for tracking the player's score
var points ;

// Variables for timing the quiz
const totalSeconds = 60 ; //  seconds the player has to complete the quiz
var   timer              ; // The timer itself
var   secondsRemaining   ; //  tracking how many seconds are left

// Event listeners
startButton.addEventListener('click', startButtonClick) ;
nextButton .addEventListener('click', nextButtonClick ) ;

// Starts when the player clicks the start button then starts the game
function startButtonClick ()
{
  console.log('Quiz starting') ;
   
  startButton.classList.add('hide') ;
  shuffledQuestions = questions.sort(() => Math.random() - .5) ;
  currentQuestionIndex = 0 ;
  questionContainerElement.classList.remove('hide') ;
  setNextQuestion() ;
  
  // Resets points, and time to complete game
  points           = 0 ;
  secondsRemaining = totalSeconds ;
  
  // Display initial time remaining to player
  timeRemainingElement.innerText = secondsRemaining + ' seconds remaining' ;
  // Set timer going - the interval is 1000 miliseconds 
  timer = setInterval(timerInterval, 1000) ;
}

// Fires when the player clicks the next button
function nextButtonClick ()
{
  currentQuestionIndex++ ;
  
  setNextQuestion() ;
}
// Sets up the next question
function setNextQuestion ()
{
  resetState() ;
  
  showQuestion(shuffledQuestions[currentQuestionIndex]) ;
}
// Adds the text to the buttons and the question box
function showQuestion (question)
{
  questionElement.innerText = question.question ;
  
  question.answers.forEach(answer =>
  {
    const button = document.createElement('button') ;
    button.innerText = answer.text ;
    button.classList.add('btn') ;
    
    if (answer.correct)
    {
      button.dataset.correct = answer.correct ;
    }
    
    button.addEventListener('click', selectAnswer) ;
    answerButtonsElement.appendChild(button) ;
  })
}
// Resets and sets up next question
function resetState ()
{
  nextButton.classList.add('hide') ;
  
  while (answerButtonsElement.firstChild)
  {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild) ;
  }
}
// The selection of the answers
function selectAnswer (e)
{
  const selectedButton = e.target ;
  const correct = selectedButton.dataset.correct ;
  // If answer is correct, increase player's points
  if (correct === 'true')
  {
    points++ ;
    console.log('Points increased to ' + points) ;
  }
  // If answer is wrong, subtract 15 seconds from remaining time
  else
  {
    secondsRemaining += -15 ;
    console.log('Subtracting 15s, remaining: ' + secondsRemaining) ;
  }
  Array.from(answerButtonsElement.children).forEach(button =>
  {
    setStatusClass(button, button.dataset.correct) ;
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1)
  {
    nextButton.classList.remove('hide') ;
  }
  else
  {
    endButton.innerText = 'End' ;
    endButton.classList.remove('hide') ;
    endButton.addEventListener('click', endgame) ;
  }
}
//sets the class after the question is selected
function setStatusClass (element, correct)
{
  clearStatusClass(element) ;
  
  if (correct)
  {
    element.classList.add('correct') ;
  }
  
  else
  {
    element.classList.add('wrong') ;
  }
}
//when the new question comes on screen resets class
function clearStatusClass (element)
{
  element.classList.remove('correct') ;
  element.classList.remove('wrong') ;
}
// This function is called once a second while the timer is running
function timerInterval ()
{
    console.log('timer: ' + secondsRemaining) ;
    // Subtract 1 second from player's time
    secondsRemaining-- ;
    // Show time depleting on screen
    timeRemainingElement.innerText = secondsRemaining + ' seconds remaining' ;
    // If there is no time remaining, the quiz ends
    if (secondsRemaining <= 0)
    {
       endgame() ;
    }
}
//here are the questions that get put out
const questions =
[
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
      { text: 'Allergy Relief ', correct: true },
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
      { text: 'Help Treat Cronic Bronchitis Or Other Resp. Issues', correct: true },
      { text: 'Make You Cry', correct: false }
    ]
  }
]
// Handles the end of the game
// Runs when either time runs out, or the player clicks the 'end' button
function endgame ()
{
  console.log('Quiz ending: points ' + points + ', time remaining ' + secondsRemaining) ;
  // Disable the timer again     
  clearInterval(timer) ;
  var scoreboard         ; 
  var scoreboardAsString ;
  scoreboardAsString = localStorage.getItem('scoreboard') ;
  if (!scoreboardAsString)
  {
      scoreboard = [] ;
  }
  else
  {
      scoreboard = JSON.parse(scoreboardAsString) ;
  }
  var score =
  {
     name: null ,
     points: points
  } ;
  scoreboard.push(score) ;
  scoreboardAsString = JSON.stringify(scoreboard) ;  
  localStorage.setItem('scoreboard', scoreboardAsString) ;
  window.location.href = "scores.html" ;
}