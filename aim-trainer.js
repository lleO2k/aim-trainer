let isGameRunning = false;
let correctClicks = 0.0;
let misClicks = 0.0;
let targetMiss = 0;
let idNumber = 1;
$(document).ready(function () {
    $(".aim-dot").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if(!isGameRunning) {
            return false;
        }
        $(this).remove();
        correctClicks += 1;
        targetMiss -= 1;
        $("#audioFile" + getRandomInt(8))[0].play();
    });
    $("#aim-div").click(function (e) { 
        e.preventDefault();
        if(!isGameRunning) {
            return false;
        }
        $("#audioFile8")[0].play();
        misClicks += 1;
    });
    $("#start").click(function (e) { 
        e.preventDefault();
        if(!isGameRunning) {
            $("#timer-span").text("1:00");
            $("#result").css("display", "none");
            correctClicks = 0;
            misClicks = 0;
            targetMiss = 0;
            let timeLeft = 60;
            let timer = setInterval(() => {
                timeLeft -= 1;
                if (timeLeft < 10)
                    $("#timer-span").text("0:0" + timeLeft);
                else
                    $("#timer-span").text("0:" + timeLeft);
            }, 1000);
            let timer2 = setInterval(() => {
                createNewDot();
            }, $("#dots-per-sec").val());
            setTimeout(() => {
                clearInterval(timer);
                clearInterval(timer2);
                $("#accuracy").text("Accuracy : " + (correctClicks/(correctClicks + misClicks)).toFixed(4) * 100 + "%");
                $("#hits").text("Targets hit : " + correctClicks);
                $("#misses").text("Targets missed : " + targetMiss);
                $("#result").css("display", "flex");
                isGameRunning = false;
            }, 61000);
            isGameRunning = true;
        } else {
            return false;
        }
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createNewDot() {
    let marginRight = getRandomInt(640);
    let marginTop = getRandomInt(440);
    let id = "dot" + idNumber;
    idNumber++;
    $("#dot").clone(true).attr('id', id).css("display", "block").css("margin", String(marginTop) + "px " + String(marginRight) + "px " + String(440 - marginTop) + "px " + String(640 - marginRight) + "px").appendTo("#aim-div");
    $("#" + id).animate({height: "60px", width: "60px"}, 1500, "linear", () =>{
        $("#" + id).remove();
        targetMiss += 1;
    });
}