// Headers and table
var boxes = document.getElementById('boxes');
var columnHeaders = document.getElementById('column-headers');
var rowHeaders = document.getElementById('row-headers');

// Buttons 
var startBtn = document.getElementById('start-button');
var resetBtn = document.getElementById('reset-button');
var submitBtn = document.getElementById('submit-button');

// Variables
var score = 0;
var scoreValue = 0;
var timerVar;
var totalSeconds;

// Create Tables and Headers
function createBoxes(min, max) {
	createColumnHeaders(min, max);
	createRowHeaders(min, max);

	for (let i = min; i <= max; i++) {

		for (let j = min; j <= max; j++) {
			var box = document.createElement('INPUT');
			box.setAttribute('type', 'text');
			var boxId = i + 'x' + j;
			box.setAttribute('id', boxId);
			var boxValue = i * j;
			box.setAttribute('value', boxValue);
			box.setAttribute('data-value', boxValue);
			box.classList.add('box');
			boxes.append(box);
		}

	}
}

function createColumnHeaders(min, max) {
	for (let i = min; i <= max; i++) {
		var columnHeader = document.createElement('div');
		columnHeader.classList.add('header');
		columnHeader.innerText = i;
		columnHeaders.append(columnHeader);
	}
}

function createRowHeaders(min, max) {
	for (let i = min; i <= max; i++) {
		var rowHeader = document.createElement('div');
		rowHeader.classList.add('header');
		rowHeader.innerText = i;
		rowHeaders.append(rowHeader);
	}
}

// Button Functions
function start() {
	var emptyBoxes = document.querySelectorAll('input');
	for (var i = 0; i < emptyBoxes.length; i++) {
		emptyBoxes[i].value = "";
	}
	startBtn.classList.add('hidden');
	submitBtn.classList.remove('hidden');
}

function submit() {
	var answerElements = document.querySelectorAll('.box');
	
	for (var k = 0; k < answerElements.length; k++) {
		var correctAnswer = answerElements[k].getAttribute('data-value');

		if (answerElements[k].value == correctAnswer) {
			score++;
			answerElements[k].classList.add('green');
		}
		else {
			answerElements[k].classList.add('red');
		}
	}

	submitBtn.classList.add('hidden');
	resetBtn.classList.remove('hidden');
	scoreElement.innerHTML = 'Score: ' + score + '%';
}

function reset() {
	window.location.reload();
}

// Timer functionality
function startTimer() {
	timerVar = setInterval(countTimer, 1000);
	totalSeconds = 0;

	function countTimer() {
		++totalSeconds;
		var hour = Math.floor(totalSeconds / 3600);
		minute = Math.floor((totalSeconds - hour * 3600) / 60);
		seconds = totalSeconds - (hour * 3600 + minute * 60);
		if (hour < 10)
			hour = "0" + hour;
		if (minute < 10)
			minute = "0" + minute;
		if (seconds < 10)
			seconds = "0" + seconds;
		document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
	}
}

function stopTimer() {
	clearInterval(timerVar);
}

// Main
createBoxes(1,12);