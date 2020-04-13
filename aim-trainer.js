let isGameRunning = false;
let correctClicks = 0.0;
let misClicks = 0.0;
let targetMiss = 0;
let idNumber = 1;
$(document).ready(function () {
    let timer;
    let timer2;
    let timeout;
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
            timer = setInterval(() => {
                timeLeft -= 1;
                if (timeLeft < 10)
                    $("#timer-span").text("0:0" + timeLeft);
                else
                    $("#timer-span").text("0:" + timeLeft);
            }, 1000);
            timer2 = setInterval(() => {
                createNewDot();
            }, $("#dots-per-sec").val());
            timeout = setTimeout(() => {
                clearInterval(timer);
                clearInterval(timer2);
                $("#accuracy").text("Accuracy : " + Number.parseFloat((correctClicks/(correctClicks + misClicks))).toFixed(4) * 100 + "%");
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
    $("#reset").click(function (e) {
        e.preventDefault();
        if(isGameRunning) {
            isGameRunning = false;
            clearTimeout(timeout);
            clearInterval(timer);
            clearInterval(timer2);
            $("#timer-span").text("1:00");
            $("#result").css("display", "none");
        } else {
            $("#timer-span").text("1:00");
            $("#result").css("display", "none");
        }
    })
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createNewDot() {
    let aimDivHeight = $("#aim-div").height();
    let aimDivWidth = $("#aim-div").width();
    let maxMarginHorizontal = aimDivWidth - 60
    let maxMarginVertical = aimDivHeight - 60
    let marginRight = getRandomInt(maxMarginHorizontal);
    let marginTop = getRandomInt(maxMarginVertical);
    let id = "dot" + idNumber;
    idNumber++;
    $("#dot").clone(true).attr('id', id).css("display", "block").css("margin", String(marginTop) + "px " + String(marginRight) + "px " + String(maxMarginVertical - marginTop) + "px " + String(maxMarginHorizontal - marginRight) + "px").appendTo("#aim-div");
    $("#" + id).animate({height: "60px", width: "60px"}, 1500, "linear", () =>{1
        $("#" + id).remove();
        targetMiss += 1;
    });
}