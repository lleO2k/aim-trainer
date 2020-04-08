let isGameRunning = false;
let correctClicks = 0.0;
let misClicks = 0.0;
$(document).ready(function () {
    $("#aim-dot").click(function (e) { 
        e.preventDefault();
        if(!isGameRunning) {
            return false;
        }
        $("#audioFile" + getRandomInt(8))[0].play();
        correctClicks += 1;
        let marginRight = getRandomInt(670);
        let marginTop = getRandomInt(470);
        $("#aim-dot").css("margin", String(marginTop) + "px " + String(marginRight) + "px " + String(470 - marginTop) + "px " + String(670 - marginRight) + "px");
        e.stopPropagation();        
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
            $("#aim-dot").css("margin", "235px 335px 235px 335px")
            let timeLeft = 60;
            let timer = setInterval(() => {
                timeLeft -= 1;
                if (timeLeft < 10)
                    $("#timer-span").text("0:0" + timeLeft);
                else
                    $("#timer-span").text("0:" + timeLeft);
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                $("#accuracy").text("Accuracy : " + (correctClicks/(correctClicks + misClicks)).toFixed(4) * 100 + "%");
                $("#hits").text("Targets hit : " + correctClicks);
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