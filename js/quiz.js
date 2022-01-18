var questions = [{
    title: "2 + 2 =", 
    choices: ["1", "2", "4"], 
    answer: "4"
},
{
    title: "What side of the coast is the best coast?",
    choices: ["West-Coast", "East-Coast", "What Coast?"],
    answer: "West-Coast"
},
{
    title: "What color is the sky?", 
    choices: ["Blue", "Red", "Yellow", "Orange", "It's All The Colors"], 
    answer: "It's All The Colors"
},
{
    title: "Whose the best basketball team in the NBA (The Author's favorite, obviously bias lol)?",
    choices: ["The Lakers", "The Warriors", "The Nets"],
    answer: "The Warriors"
}

]

//baseline values
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

    timeLeft = 15;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//end's the game when timer runs out and added textcontent for when end game window shows up
function endGame() {
    clearInterval(timer);
    
    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set High Score!</button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
    
//local storage functions
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
    }
    
    
    function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
    
    //function to clear score from local storage
    function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    
    resetGame();
    }

    //resets game
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;
    
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    var quizContent = `
    <h1>
        My Personal Bias Quiz!
    </h1>
    <h3>
        Click To Start Quiz!   
    </h3>
    <button onclick="start()">Start!</button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
    
    //deduct 15seconds from the timer if user chooses an incorrect answer
    function incorrect() {
    timeLeft -= 15; 
    next();
    }
    
    //increases the score by 20points if the user chooses the correct answer
    function correct() {
    score += 20;
    next();
    }

    //starts the quiz and loops the questions one after the other

function next() {
    currentQuestion++;
    
    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    
    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
    
    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }