var boxes = document.getElementById('boxes');
var columnHeaders = document.getElementById('column-headers');
var rowHeaders = document.getElementById('row-headers');
var instructions = document.getElementById('instructions');
var quizBtn = document.getElementById('quiz-button');
var resetBtn = document.getElementById('reset-button');
var review = document.getElementById('review');
var scoreElement = document.getElementById('score');
var submitBtn = document.getElementById('submit-button');
var accElement = document.getElementById('acc');
var score = 0;
var acc = 0;
var totalSeconds;

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

function startQuiz() {
	var emptyBoxes = document.querySelectorAll('input');

	for (var h = 0; h < emptyBoxes.length; h++) {
		emptyBoxes[h].value = "";
	}

	review.classList.add('hidden');
	instructions.classList.remove('hidden');
	quizBtn.classList.add('hidden');
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
	instructions.classList.add('hidden');

	acc = (score/144) * 100;
	score = 20000 - (totalSeconds*10);
	if(score < 0) {
		score = 0;
	}
	if(acc < 100) {
		score = acc*1000;
	}
	scoreElement.innerHTML = 'Score: ' + score.toFixed(0);
	accElement.innerHTML = 'Accuracy: ' + acc.toFixed(1) + '%';
}

function reset() {
	window.location.reload();
}

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

createBoxes(1,12);