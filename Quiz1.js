const questions = [
    {
        question: "Which is the Largest Animal in the World",

        answers: [
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Tiger", correct: false },
        ]
    },

    {
        question: "Which the Largest Ocean in the World ",

        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Artic Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ]
    },

    {
        question: "How Many Continents are Present in the World",

        answers: [
            { text: "5", correct: false },
            { text: "8", correct: false },
            { text: "7", correct: true },
            { text: "6", correct: false },
        ]
    },

    {
        question: "Who invented Bulb",

        answers: [
            { text: "Tesla", correct: false },
            { text: "Elon Musk", correct: false },
            { text: "Thomas Edison", correct: true },
            { text: "Jeff Bezos", correct: false },
        ]
    },

    {
        question: "What is our National Anthem",

        answers: [
            { text: "jana gana mana", correct: true },
            { text: "Vande mataram", correct: false },
            { text: "jai telangana", correct: false },
            { text: "None of the above", correct: false },
        ]
    },

    {
        question: "What is capital of India ",

        answers: [
            { text: "Delhi", correct: true },
            { text: "Hyderabad", correct: false },
            { text: "Andhra Pradesh", correct: false },
            { text: "Tamil Nadu", correct: false },
        ]
    },

    {
        question: "Which is the Richest Country in the world",

        answers: [
            { text: "India", correct: false },
            { text: "USA", correct: false },
            { text: "Luxemburg", correct: true },
            { text: "None of the above", correct: false },
        ]
    },

    {
        question: "Which is not an animal",

        answers: [
            { text: "Tiger", correct: false },
            { text: "Elephant", correct: false },
            { text: "Gold fish", correct: true },
            { text: "Cow", correct: false },
        ]
    },

    {
        question: "Which is not a bird",

        answers: [
            { text: "Eagle", correct: false },
            { text: "Giraffe", correct: true },
            { text: "WoodPecker", correct: false },
            { text: "Pegion", correct: false },
        ]
    },

    {
        question: "Which is not a country",

        answers: [
            { text: "Delhi", correct: true },
            { text: "USA", correct: false },
            { text: "Australia", correct: false },
            { text: "India", correct: false },
        ]
    },

    {
        question: "Which is not a River",

        answers: [
            { text: "Indian Ocean", correct: true },
            { text: "Ganga", correct: false },
            { text: "Godavari", correct: true },
            { text: "None of the above", correct: false },
        ]
    },

    {
        question: "Which is not a city",

        answers: [
            { text: "Delhi", correct: false },
            { text: "Mumbai", correct: false },
            { text: "Pune", correct: false },
            { text: "None of the above", correct: true },
        ]
    },

    {
        question: "Which of the following is a city",

        answers: [
            { text: "Hyderabad", correct: true },
            { text: "USA", correct: false },
            { text: "India", correct: false },
            { text: "None of the above", correct: false },
        ]
    },

    {
        question: "What is the capital of USA",

        answers: [
            { text: "USA", correct: false },
            { text: "INDIA", correct: false },
            { text: "RUSSIA", correct: false },
            { text: "Washington DC", correct: true },
        ]
    },

    {
        question: "What is the captial of Russia",

        answers: [
            { text: "LOndon", correct: false },
            { text: "Berlin", correct: false },
            { text: "Moscow", correct: true },
            { text: "None of the above", correct: false },
        ]
    },
]



const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-btn");
const nextbutton = document.getElementById("Nxt-Btn");
const btn1 = document.querySelector(".btn1");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
    startTimer();

}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore(true);
        }
    }, 1000);
}

function showQuestion() {
    answerbutton.innerHTML = "";
    nextbutton.style.display = "none";

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionelement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.onclick = () => selectAnswer(button, answer.correct);
        answerbutton.appendChild(button);
    });
}

function selectAnswer(selectedButton, isCorrect) {

    Array.from(answerbutton.children).forEach(btn => {
        btn.disabled = true;
        if (btn === selectedButton) {
            btn.classList.add(isCorrect ? "correct" : "incorrect");
        }

        if (!isCorrect && questions[currentQuestionIndex].answers.find(a => a.correct && a.text === btn.innerHTML)) {
            btn.classList.add("correct");
        }
    });

    if (isCorrect) {
        score++;
    }
    nextbutton.style.display = "inline-block";
    nextbutton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            clearInterval(timer);
            showScore();
        }
    };
}

function showScore(timeUp = false) {
    if (timeUp) {
        questionelement.innerHTML = `Time's up! Your score: ${score}/${questions.length}`;
    } else {
        questionelement.innerHTML = `Quiz finished! Your score: ${score}/${questions.length}`;
    }
    answerbutton.innerHTML = "";
    nextbutton.innerHTML = "Restart";
    nextbutton.style.display = "inline-block";
    nextbutton.onclick = () => {
        clearInterval(timer);
        startQuiz();
    };
}

function saveScoreToLocalStorage(playerName, score) {
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scores.push({ name: playerName, score: score, date: new Date().toLocaleString() });
    localStorage.setItem('quizScores', JSON.stringify(scores));
}

function displayScoreboard() {
    const scoreboard = document.getElementById("scoreboard");
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    if (scores.length === 0) {
        scoreboard.innerHTML = "<h3>No scores yet!</h3>";
        return;
    }
    let html = "<h3>Previous Scores</h3><ul style='list-style:none;padding:0;'>";
    scores.slice(-5).reverse().forEach(s => {
        html += `<li style="margin-bottom:8px;background:#dff9fb;padding:8px 12px;border-radius:8px;">
            <strong>${s.name}</strong>: ${s.score} <span style="font-size:0.9em;color:#636e72;">(${s.date})</span>
        </li>`;
    });
    html += "</ul>";
    scoreboard.innerHTML = html;
}


displayScoreboard();


startQuiz();