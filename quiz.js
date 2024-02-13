const questions = [
  {
    question: "What is her favorite food?",
    answer: [
        {text: "Sushi", correct: false},
        {text: "Japchae", correct: true},
        {text: "Hotpot", correct: false},
        {text: "Dumplings", correct: false},
    ]
  },

  {
    question: "She has a favorite traditional festival. What is it?",
    answer: [
        {text: "Thingyan", correct: true},
        {text: "Thadingyut", correct: false},
        {text: "Taungbyone Nat", correct: false},
        {text: "Shittaung Pagoda", correct: false},
    ]
  },

  {
    question: "Her favorite artist is an interesting one. Can you guess it?",
    answer: [
        {text: "Rich Amiri", correct: false},
        {text: "Willie Nelson", correct: false},
        {text: "Taylor-Swift", correct: false},
        {text: "Pitbull", correct: true},
    ]
  },

  {
    question: "Why does May not have her license yet?",
    answer: [
        {text: "She's a terrible driver", correct: true},
        {text: "She prefers flying", correct: false},
        {text: "She'd rather be a passenger-princess", correct: true},
        {text: "She never needed one", correct: false},
    ]
  },

  {
    question: "What is her favorite gym workout?",
    answer: [
        {text: "Bench", correct: true},
        {text: "Squat", correct: false},
        {text: "Deadlift", correct: false},
        {text: "She's never stepped foot in a gym before", correct: false},
    ]
  },

  {
    question: "What is one thing you shouldn't wear around May?",
    answer: [
        {text: "flannels", correct: false},
        {text: "Skinny jeans", correct: true},
        {text: "sleeveless hoodies", correct: false},
        {text: "cowboy hat", correct: false},
    ]
  },

  {
    question: "May is currently feeling overwhelmed and stressed? What can you do to make her feel better?",
    answer: [
        {text: "Ignore her", correct: false},
        {text: "Give her gum", correct: false},
        {text: "Bake her brownies", correct: true},
        {text: "Tell her to drink water", correct: false},
    ]
  },

  {
    question: "While growing up, what part of her body did May injure?",
    answer: [
        {text: "ankles", correct: true},
        {text: "arm", correct: false},
        {text: "wrist", correct: false},
        {text: "knee", correct: false},
    ]
  },

  {
    question: "You are approaching May to get her number. How should you go about it?",
    answer: [
        {text: "You shouldn't, she got a man(me)", correct: true},
        {text: "Turn around and walk away", correct: true},
        {text: "She doesn't give out her number and would prefer it if you asked for her snap", correct: false},
        {text: "Crush on her for a while, then hold the door open for her and ask her on a study date", correct: true},
    ]
  },

  {
    question: "Who is this mysterious, epic, awesome man that claims to be May's man?",
    answer: [
        {text: "Aayish", correct: true},
        {text: "me", correct: true},
        {text: "Aaznee", correct: true},
        {text: "Aashish", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
currentQuestionIndex = 0;
score = 0;
nextButton.innerHTML = "NEXT";
showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


  if (currentQuestionIndex === 0) {
    document.querySelector('.quiz h1').innerHTML = "Valentines Quiz: Answer all questions correctly for May to consider being your Valentine!";
  } else {
    document.querySelector('.quiz h1').innerHTML = "Valentines Quiz:";
  }

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
nextButton.style.display = "none";
while(answerButtons.firstChild) {
  answerButtons.removeChild(answerButtons.firstChild);
}
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  let scoreMessage = "";
  if (score === questions.length) {
    scoreMessage = "Wow good job man, now go be epic couple together.";
  } else {
    scoreMessage = "Bro sold... She hates you now. Rethink your actions smh.";
  }
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! ${scoreMessage}`;
  nextButton.innerHTML = "Try Again";
  nextButton.style.display = "block";

  if (score === questions.length) {
    document.body.style.backgroundImage = "url('images/flowerfield.jpeg')";
  } else {
    document.body.style.backgroundImage = "url('images/sadwolf.png')";
  }
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
});

startQuiz();