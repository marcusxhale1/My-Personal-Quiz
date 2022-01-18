var myQuestions = [
    {
        question: "2 + 2 =", 
        answers: ["1", "2", "4"], 
        answer: "4"
    },
    {
        question: "What side of the coast is the best coast?",
        answers: ["West Coast", "East Coast", "What Coast?"],
        answer: "West Coast"
    },
    {
        question: "What color is the sky?", 
        answers: ["Blue", "Red", "Yellow", "Orange", "It's All The Colors"], 
        answer: "It's All The Colors"
    },
    {
        question: "Whose the best basketball team in the NBA (The Author's favorite, obviously bias lol)?",
        answers: ["The Lakers", "The Warriors", "The Nets"],
        answer: "The Warriors"
    }

]

var score = 0; 
var currentQuestion = -1;
var timeLeft = 0;
var timer; 

function start(){
    timeLeft = 7
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function(){
        timeLeft--;
        document.getElementById("timer").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }

    }, 1000);
    next();
}

function endGame() {
    clearInterval(timer);
    
    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got` + score / 5 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }