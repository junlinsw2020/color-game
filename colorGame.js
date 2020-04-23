// keep track of how many square shown on page
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for (var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		// other buttons class selected gets turn off when we click on one button
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		// figure out how many squares to show
		this.textContent === "EASY"? numSquares = 3: numSquares = 6;
		reset();
		// pick new color for those squares
	});
}

function reset() {
		colors = generateRandomColors(numSquares);
		// picka  new random color from array
		pickedColor = pickColor();
		// change color display to match picked color
		colorDisplay.textContent = pickedColor;
		resetButton.textContent = "New Colors";
		messageDisplay.textContent = "";
		for (var i = 0; i < squares.length; i++) {
			// rhere's always 6 squares, if there's 6 colors then all square will show
			if(colors[i]){
				// changing colros of square to match colors from the colors array
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

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length;i++){
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
		// if you win
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