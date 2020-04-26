// keep track of how many square shown on page
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			// other buttons class selected gets turn off when we click on one button
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// figure out how many squares to show
			this.textContent === "EASY"? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length;i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			// if player chooses correct color
			if (clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		})
	}
}

function reset() {
		colors = generateRandomColors(numSquares);
		// pick a new random color from array
		pickedColor = pickColor();
		// change color display to match picked color
		colorDisplay.textContent = pickedColor;
		resetButton.textContent = "New Colors";
		messageDisplay.textContent = "";
		for (var i = 0; i < squares.length; i++) {
			// default is always 6 squares, if there's 6 colors then all squares will show
			if(colors[i]){
				// changing colors of square to match colors from colors array
				squares[i].style.display = "block";
				squares[i].style.backgroundColor = colors[i];
				// if there's not 6 colors to match 6 squares, we will hide the last three squares.
			} else {
				squares[i].style.display = "none";
			}
		}
		h1.style.backgroundColor = "silver";
}

resetButton.addEventListener("click", function(){
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// picka  new random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;
	this.textContent = "New Colors";
	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "silver";
});

// change all sqaures color to the clicked color
function changeColors(color){
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
};

// pick a random color from the num of squares => colors.length
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
};

// generates NUM number os combinations
function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
};

// 1 random color combination
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
};