// ===== QUESTION DATA =====
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Rome"],
    correct: 0
  },
  {
    question: "2 + 2 = ?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Which language runs in the browser?",
    answers: ["Python", "C++", "JavaScript", "Java"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;

// ===== ELEMENTS =====
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const timeRemaining = document.getElementById("time-remaining");

const finalScore = document.getElementById("final-score");
const finalPercentage = document.getElementById("final-percentage");

// ===== EVENT LISTENERS =====
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  setNextQuestion();
});
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  startQuiz();
});

// ===== FUNCTIONS =====
function startQuiz() {
  welcomeScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  currentQuestion = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if(currentQuestion >= questions.length){
    showResult();
    return;
  }
  showQuestion(questions[currentQuestion]);
  startTimer();
}

function showQuestion(question) {
  questionText.textContent = question.question;
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timeRemaining.textContent = timeLeft;
  nextBtn.disabled = true;
  answersContainer.innerHTML = "";
}

function selectAnswer(index) {
  clearInterval(timerInterval);
  const correctIndex = questions[currentQuestion].correct;
  const buttons = answersContainer.children;

  Array.from(buttons).forEach((btn, idx) => {
    if(idx === correctIndex) btn.classList.add("correct");
    if(idx === index && index !== correctIndex) btn.classList.add("wrong");
    btn.disabled = true;
  });

  if(index === correctIndex) score++;
  nextBtn.disabled = false;
}

function startTimer() {
  timeRemaining.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timeRemaining.textContent = timeLeft;
    if(timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(-1); // Auto move if time runs out
    }
  }, 1000);
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  finalScore.textContent = `Score: ${score} / ${questions.length}`;
  finalPercentage.textContent = `${Math.round((score / questions.length) * 100)}%`;
}
