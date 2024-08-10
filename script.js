const minutesLabel = document.getElementById("minutes");
const secondLabel = document.getElementById("seconds");
const millisecondLabel = document.getElementById("millisecond");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("laplist");

/// stopwatch variables

let minutes = 0;
let seconds = 0;
let millisecond = 0;
let interval;

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
    interval = setInterval(updateTimer, 10);

    startBtn.disabled = true;
}

function stopTimer() {
    clearInterval(interval);

    addToLapList();

    startBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(interval);
    startBtn.disabled = false;
}

function resetTimer() {
    clearInterval(interval);
    resetTimeData();
    startBtn.disabled = false;
    lapList.innerHTML = "";
}

function updateTimer() {
    millisecond++;

    if (millisecond === 100) {
        /// 1000  -> 1 second = 1000 millisecond
        millisecond = 0;
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

function displayTimer() {
    millisecondLabel.textContent = padTime(millisecond);
    secondLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time) {
    return time.toString().padStart(2, "0");
}

function resetTimeData() {
    minutes = seconds = millisecond = 0;
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(millisecond)}`;

    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;

    lapList.appendChild(listItem);
}
