
    // This allows the jquery and js script to work
    $(document).ready(function() {

    // This changes the html button element with jquery and styles the button to be the bootstrap green button (success)
    function initialScreen() {
        startScreen = "<p class='text-center quiz-container'><a class='btn btn-success btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".main").html(startScreen);
    }
    initialScreen();
    
    // This creates the function to allow the player to click the start (the large jumbotron) button and start the game
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        generateHTML();
        timer();
    }); 
    
    // This creates the function to allow the player to click on the answer
    $("body").on("click", ".answer", function(event){
        playerAnswer = $(this).text();
        if(playerAnswer === answerKey[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    // This will reset the game once the player clicks the "reset" button
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    }); 
    
    });  
    
    // This sets the timer for the player to answer the question. If time is up, the player loses.
    function generateLossDueToTimeOut() {
        unanswered++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + answerKey[questionCounter] + "</p>";
        $(".main").html(gameHTML);
        setTimeout(wait, 3000);  
    }
    
    // This logs if the player answers a question correctly
    function generateWin() {
        correctAnswers++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + answerKey[questionCounter] + "</p>";
        $(".main").html(gameHTML);
        setTimeout(wait, 3000);  
    }

    // This logs if the player answers a question incorrectly
    function generateLoss() {
        incorrectAnswers++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ answerKey[questionCounter] + "</p>";
        $(".main").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    
    // This placed the timer centered above the questions and counts down from 15 sec
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='text-center first-answer answer'>A. " + multipleChoice[questionCounter][0] + "</p><p class='text-center answer'>B. "+multipleChoice[questionCounter][1]+"</p><p class='text-center answer'>C. "+multipleChoice[questionCounter][2]+"</p><p class='text-center answer'>D. "+multipleChoice[questionCounter][3]+"</p>";
        $(".main").html(gameHTML);
    }
    
    // This sets a wait function before the next question is asked
    function wait() {
        if (questionCounter < 9) {
        questionCounter++;
        generateHTML();
        counter = 15;
        timer();
        }
        else {
            resultScreen();
        }
    }

    function timer() {
        theClock = setInterval(stopwatch, 1000);
        function stopwatch() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    // shows the results of the players score total and stats
    function resultScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Results" + "</p>" + "<p class='text-center'>Correct Answers: " + correctAnswers + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectAnswers + "</p>" + "<p class='text-center'>Unanswered: " + unanswered + "</p>" + "<p class='text-center'><a class='btn btn-success btn-lg btn-block reset-button' href='#' role='button'>Start Over!</a></p>";
        $(".main").html(gameHTML);
    }
    
    // resets the game to the beginning
    function resetGame() {
        questionCounter = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        counter = 15;
        generateHTML();
        timer();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 15;
    // questions
    var questionArray = ["What is the name of the stadium where the Timberwolves play?", "What was Kevin Garnett's jersey number?", "What is the Timberwolve's mascot name?", "In his first ever career game, Stephon Marbury injured his what?", "Before moving to the Target Center, where did the Timberwolves play?", "Which year did the Timberwolves host the NBA All-Star Game?", "Which former Minnesota Timberwolves player was the sole rookie on the original Dream Team?", "What draft pick was Kevin Garnett?", "Who is the owner of the Minnesota Timberwolves?", "What year did Kevin Garnett win the NBA Most Valuable Player Award"];
    // multiple choice selections
    var multipleChoice = [["Staples Center", "Madison Square Garden", "Target Center", "Toyota Center"], ["Twenty Four","Twenty One","Twenty Three","Thirty Two"], ["Chip", "Wolfy", "Oscar", "Crunch"], ["Ankle","Wrist","Hamstring","Head"], ["Civic Center", "Metrodome", "Excel Center", "Williams Arena"], ["2001","2004","1997","1994"], ["Kevin Garnett", "Christian Laettner", "Joe Smith", "Isaiah Rider"], ["Second","First","Fifth","Third"], ["Kevin McHale","Glen Taylor","Mark Cuban","Troy Hudson"], ["2000","2006","2004","2002"]];
    // correct answers
    var answerKey = ["C. Target Center", "B. Twenty One", "D. Crunch", "A. Ankle", "B. Metrodome", "D. 1994", "B. Christian Laettner", "C. Fifth", "B. Glen Taylor", "C. 2004"];
    var questionCounter = 0;
    var playerAnswer;
    var theClock;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;