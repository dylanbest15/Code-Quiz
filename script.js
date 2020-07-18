$(document).ready(function () {

    //main variable
    var main = $("#main");

    // timer variables
    var secondsLeft = 75;
    var timer = $("#timer").text(`Time: ${secondsLeft}`);
    var timerInterval;

    //highscore array
    var highscoreArray = [];
    if (localStorage) {
        highscoreArray.push(JSON.parse(localStorage.getItem("highscoreArray")));
    }

    // question and answer variables
    var question;
    var answers = [];
    var questionIndex = 1;

    var question1 = {
        question: "Commonly used data types DO NOT include:",
        answer1: "1. strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers"
    }

    var question2 = {
        question: "The condition in an if/else statement is enclosed within _____.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parentheses",
        answer4: "4. square brackets"
    }

    var question3 = {
        question: "Arrays in Javascript can be used to store _____.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        answer4: "4. all of the above"
    }

    var question4 = {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer1: "1. commas",
        answer2: "2. curly brackets",
        answer3: "3. quotes",
        answer4: "4. parentheses"
    }

    var question5 = {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "1. Javascript",
        answer2: "2. terminal / bash",
        answer3: "3. for loops",
        answer4: "4. console.log"
    }

    //starts timer
    function setTime() {

            timerInterval = setInterval(function () {
            secondsLeft--;
            timer.text(`Time: ${secondsLeft}`);

            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                var string = "Time's up!";
                gameOver(string);
            }

        }, 1000);
    }

    //sets up question and answer variables
    function setQuestion() {
        if (questionIndex === 1) {
            question = question1.question;
            answers = [question1.answer1, question1.answer2, question1.answer3, question1.answer4];
        }
        else if (questionIndex === 2) {
            question = question2.question;
            answers = [question2.answer1, question2.answer2, question2.answer3, question2.answer4];
        }
        else if (questionIndex === 3) {
            question = question3.question;
            answers = [question3.answer1, question3.answer2, question3.answer3, question3.answer4];
        }
        else if (questionIndex === 4) {
            question = question4.question;
            answers = [question4.answer1, question4.answer2, question4.answer3, question4.answer4];
        }
        else {
            question = question5.question;
            answers = [question5.answer1, question5.answer2, question5.answer3, question5.answer4];
        }

        //sets index to next question
        questionIndex++;
    }

    //creates next question with answers
    function createQuestion() {

        //creates new question text
        var newQuestion = $("<h1>");
        main.append(newQuestion);
        newQuestion.text(question);

        //creates new answer buttons
        for (var i = 0; i < answers.length; i++) {
            var newAnswer = $("<button>");
            main.append(newAnswer);
            newAnswer.attr("class", "btn btn-primary answer-button");
            newAnswer.text(answers[i]);
            main.append($("<br>"));
        }
    }

    //correct answer
    function correctAnswer() {
        var correct = $("<h2>");
        main.append(correct);
        correct.text("Correct!");
        correct.animate({ opacity: "0" }, 1000);
    }

    //wrong answer
    function wrongAnswer() {
        var wrong = $("<h2>");
        main.append(wrong);
        wrong.text("Wrong!");
        wrong.animate({ opacity: "0" }, 1000);

        //lower timer 10 seconds
        secondsLeft = secondsLeft - 10;
    }

    //empties the main text
    function nextStage() {
        main.empty();
    }

    //ends game
    function gameOver(string) {
        nextStage();
        clearInterval(timerInterval);
        timer.text(`Time: ${secondsLeft}`);

        //set header
        var header = $("<h1>");
        main.append(header);
        header.text("All done!");

        //set final score
        var score = $("<p>");
        main.append(score);
        score.text(`Your final score is ${secondsLeft}`);

        //set initials text
        var initials = $("<p>");
        main.append(initials);
        initials.text("Enter initials: ");

        //set input field
        var input = $("<input type=\"text\">");
        input.attr("id", "input");
        initials.append(input);

        //set submit button
        var submit = $("<button>");
        initials.append(submit);
        submit.attr("class", "btn btn-primary submit-button");
        submit.text("Submit");

        //set string pop up
        var popup = $("<h2>");
        main.append(popup);
        popup.text(string);
        popup.animate({ opacity: "0" }, 1000);
    }

    //show high scores
    function highScore() {
        nextStage();

        //set header
        var header = $("<h1>");
        main.append(header);
        header.text("Highscores");

        //set list container
        var list = $("<ul>");
        main.append(list);

        //set scores
        for (var i = 0; i < highscoreArray.length; i++) {
            var score = $("<li>");
            list.append(score);
            score.text(`${i + 1}. ${highscoreArray[i]}`);
        }

        //go back button
        var back = $("<button>");
        main.append(back);
        back.attr("class", "btn btn-primary back-button");
        back.text("Go back");

        //clear highscores button
        var clear = $("<button>");
        main.append(clear);
        clear.attr("class", "btn btn-primary clear-button");
        clear.text("Clear Highscores");
    }

    //start quiz button
    $("#start").on("click", function () {
        setTime();
        nextStage();
        setQuestion();
        createQuestion();
    });

    //answer button click events
    $(document).on("click", "button.answer-button", function () {

        if (questionIndex < 6) {
            nextStage();
            setQuestion();
            createQuestion();

            //check for correct answer
            if ($(this).text() === "3. alerts" ||
                $(this).text() === "3. parentheses" ||
                $(this).text() === "4. all of the above" ||
                $(this).text() === "3. quotes") {
                correctAnswer();
            }
            else {
                wrongAnswer();
            }
        }
        else {
            if ($(this).text() === "4.console.log") {
                var string = "Correct!";
                gameOver(string);
            }
            else {
                secondsLeft = secondsLeft - 10;
                var string = "Wrong!";
                gameOver(string);
            }
        }
    });

    //submit highscore click event
    $(document).on("click", "button.submit-button", function() {
        //save name and score to array
        var input = $("#input").val();
        highscoreArray.push(`${input} - ${secondsLeft}`);

        //sort highscores
        // highscoreArray.sort(function(a, b){return a - b})

        //save highscores to local storage
        localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));

        //run high score page
        highScore(input);
    });
});
