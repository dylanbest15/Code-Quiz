//main variable
var main = $("#main");

// timer variables
var secondsLeft = 75;
var timer = $("#timer").text(`Time: ${secondsLeft}`);

// question and answer variables
var question = "question";
var answers = ["1", "2", "3", "4"];
var questionIndex = 1;

var question1 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
}

var question2 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
}

var question3 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
}

var question4 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
}

var question5 = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
}

//starts timer
function setTime() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.text(`Time: ${secondsLeft}`);

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            // run function for time up
        }

    }, 1000);
}

//sets up question and answer variables
function setQuestion() {
    if (questionIndex = 1) {
        question = question1.question;
        answers = [question1.answer1, question1.answer2, question1.answer3,  question1.answer4];
    }
    else if(questionIndex = 2) {
        question = question2.question;
        answers = [question2.answer1, question2.answer2, question2.answer3, question2.answer4];
    }
    else if(questionIndex = 3) {
        question = question3.question;
        answers = [question3.answer1, question3.answer2, question3.answer3, question3.answer4];
    }
    else if(questionIndex = 4) {
        question = question4.question;
        answers = [question4.answer1, question4.answer2, question4.answer3, question4.answer4];
    }
    else {
        question = question5.question;
        answers = [question5.answer1, question5.answer2, question5.answer3, question5.answer4];
    }
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
        newAnswer.attr("class", "btn btn-primary");
        newAnswer.text(answers[i]);
        main.append($("<br>"));
    }

    //answer button click events
    $("button.btn").on("click", function() {
        nextStage();
    })
}

//empties the main text
function nextStage() {
    main.empty();
}

//start quiz button
$("#start").on("click", function() {
    setTime();
    nextStage();
    createQuestion();
});