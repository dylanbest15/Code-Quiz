// timer variables
var timer = $("span.timer");
var secondsLeft = 75;

// starts timer
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

// start quiz button
$("button.btn-primary").on("click", function () {
    setTime();
});

//sets up initial timer
timer.text(`Time: ${secondsLeft}`);