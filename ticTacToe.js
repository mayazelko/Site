// JavaScript source code
var turn = true;
var gameOver = false;
var howManyInARow = prompt("how many in a row?");
var sizeBoardLENGTH = prompt("ROWS: ");
var sizeBoardWIDTH = prompt("COLS: ");
var ticTacToe = [];
var AudioWin = new Audio('sound/wingame.wav');
while (sizeBoardLENGTH > 15 || sizeBoardWIDTH > 15 || (sizeBoardLENGTH > 15 && sizeBoardWIDTH > 15)) {
	if (sizeBoardLENGTH > 15)
		sizeBoardLENGTH = prompt("ENTER A NUMBER UNDER 16 FOR ROWS: ");
	if (sizeBoardWIDTH > 15)
		sizeBoardWIDTH = prompt("ENTER A NUMBER UNDER 16 FOR COLS: ");
}
while (Number(howManyInARow) > Number(sizeBoardLENGTH) || Number(howManyInARow) > Number(sizeBoardWIDTH) || Number(howManyInARow) > Number(sizeBoardLENGTH) && Number(howManyInARow) > Number(sizeBoardWIDTH))
	howManyInARow = prompt("how many in a row?");
for (var i = 0; i < sizeBoardLENGTH; i++) {
	var temp = [];
	for (var k = 0; k < sizeBoardWIDTH; k++) {
		temp.push(0);
	}
	ticTacToe.push(temp);
}
var images = ["pic/sha.png", "pic/px.png", "pic/po.png"];
function changeBackground(color) {
	document.body.style.background = color;
}
window.addEventListener("load", function () { changeBackground('darkgray') });
function BuildBoard() {
	var num = 0;
	var textImgTag = "";
	var text = "<table border='1' align='center' style='background-color:white'>";
	var sh, am;
	for (sh = 0; sh < sizeBoardLENGTH; sh++) {
		text = text + "<tr>";
		for (am = 0; am < sizeBoardWIDTH; am++) {
			if (sizeBoardLENGTH > 12 || sizeBoardWIDTH > 12 || (sizeBoardLENGTH > 12 && sizeBoardWIDTH > 12)) {
				textImgTag = "<img src=" + images[ticTacToe[sh][am]] + " style='widows:24px; height:24px; width:24px' />";
				text = text + "<td id='" + num + "' onclick='SwitchPic(this);' style = width:24px; height:24px; width:24px >" + textImgTag + "</td>";
			}
			else if (sizeBoardLENGTH > 8 || sizeBoardWIDTH > 8 || (sizeBoardLENGTH > 8 && sizeBoardWIDTH > 8)) {
				textImgTag = "<img src=" + images[ticTacToe[sh][am]] + " style='widows:30px; height:30px; width:30px' />";
				text = text + "<td id='" + num + "' onclick='SwitchPic(this);' style = width:30px; height:30px; width:30px >" + textImgTag + "</td>";
			}
			else {
				textImgTag = "<img src=" + images[ticTacToe[sh][am]] + " style='widows:50px; height:50px; width:50px' />";
				text = text + "<td id='" + num + "' onclick='SwitchPic(this);' style = width:50px; height:50px; width:50px >" + textImgTag + "</td>";
			}
			num++;
		}
		text = text + "</tr>";
	}
	text = text + "</table>";
	document.getElementById("Start").innerHTML = text;
}
function SwitchPic(currentThis) {
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	if (gameOver == false && turn == true && ticTacToe[CurrentRow][CurrentCol] == 0) {
		ticTacToe[CurrentRow][CurrentCol] = 1;
		if (upDownWinCheckX(currentThis) == true || rightLeftWinCheckX(currentThis) == true || alachsonPositiveWinCheckX(currentThis) == true || alachsonNegativeWinCheckX(currentThis) == true) {
			alert("X WON!");
			AudioWin.play();
		}
		//בדיקת טיקו
		var tico = true;
		for (var i = 0; i < sizeBoardLENGTH; i++) {
			for (var k = 0; k < sizeBoardWIDTH; k++) {
				if (ticTacToe[i][k] == 0)
					tico = false;
			}
		}
		if (gameOver == false && tico == true) {
			alert("TICO!");
		}
		turn = false;
		document.getElementById("ss").innerHTML = ("O turn").fontcolor("purple");;
	}
	else if (gameOver == false && turn == false && ticTacToe[CurrentRow][CurrentCol] == 0) {
		ticTacToe[CurrentRow][CurrentCol] = 2;
		if (upDownWinCheckO(currentThis) == true || rightLeftWinCheckO(currentThis) == true || alachsonPositiveWinCheckO(currentThis) == true || alachsonNegativeWinCheckO(currentThis) == true) {
			alert("O WON!");
			AudioWin.play();
		}
		//בדיקת טיקו
		var tico = true;
		for (var i = 0; i < sizeBoardLENGTH; i++) {
			for (var k = 0; k < sizeBoardWIDTH; k++) {
				if (ticTacToe[i][k] == 0)
					tico = false;
			}
		}
		if (gameOver == false && tico == true) {
			alert("TICO!");
		}
		turn = true;
		document.getElementById("ss").innerHTML = ("X turn").fontcolor("blue");;
	}
}
// בדיקות ניצחון של איקס
function upDownWinCheckX(currentThis) {
	// בדיקה אנך
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (sh < sizeBoardLENGTH && ticTacToe[sh][am] == 1) {
		sh++;
		counter++;
	}
	CurrentRow--;
	while (CurrentRow > -1 && ticTacToe[CurrentRow][CurrentCol] == 1) {
		CurrentRow--;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
function rightLeftWinCheckX(currentThis) {
	// בדיקת מאוזן
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (am < sizeBoardWIDTH && ticTacToe[sh][am] == 1) {
		am++;
		counter++;
	}
	CurrentCol--;
	while (CurrentCol > -1 && ticTacToe[CurrentRow][CurrentCol] == 1) {
		CurrentCol--;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
function alachsonPositiveWinCheckX(currentThis) {
	// בדיקת אלכסון חיובי
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (am < sizeBoardWIDTH && sh > -1 && ticTacToe[sh][am] == 1) {
		am++;
		sh--;
		counter++;
	}
	CurrentCol--;
	CurrentRow++;
	while (CurrentCol > -1 && CurrentRow < sizeBoardLENGTH && ticTacToe[CurrentRow][CurrentCol] == 1) {
		CurrentCol--;
		CurrentRow++;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
function alachsonNegativeWinCheckX(currentThis) {
	// בדיקת אלכסון שלילי
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (am < sizeBoardWIDTH && sh < sizeBoardLENGTH && ticTacToe[sh][am] == 1) {
		am++;
		sh++;
		counter++;
	}
	CurrentCol--;
	CurrentRow--;
	while (CurrentCol > -1 && CurrentRow > -1 && ticTacToe[CurrentRow][CurrentCol] == 1) {
		CurrentCol--;
		CurrentRow--;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
// בדיקות ניצחון של עיגול
function upDownWinCheckO(currentThis) {
	// בדיקה אנך
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (sh < sizeBoardLENGTH && ticTacToe[sh][am] == 2) {
		sh++;
		counter++;
	}
	CurrentRow--;
	while (CurrentRow > -1 && ticTacToe[CurrentRow][CurrentCol] == 2) {
		CurrentRow--;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
function rightLeftWinCheckO(currentThis) {
	// בדיקת מאוזן
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (am < sizeBoardWIDTH && ticTacToe[sh][am] == 2) {
		am++;
		counter++;
	}
	CurrentCol--;
	while (CurrentCol > -1 && ticTacToe[CurrentRow][CurrentCol] == 2) {
		CurrentCol--;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
function alachsonPositiveWinCheckO(currentThis) {
	// בדיקת אלכסון חיובי
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (am < sizeBoardWIDTH && sh > -1 && ticTacToe[sh][am] == 2) {
		am++;
		sh--;
		counter++;
	}
	CurrentCol--;
	CurrentRow++;
	while (CurrentCol > -1 && CurrentRow < sizeBoardLENGTH && ticTacToe[CurrentRow][CurrentCol] == 2) {
		CurrentCol--;
		CurrentRow++;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}
function alachsonNegativeWinCheckO(currentThis) {
	// בדיקת אלכסון שלילי
	var counter = 0;
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / sizeBoardWIDTH);
	var CurrentCol = CurrentId % sizeBoardWIDTH;
	var sh = CurrentRow;
	var am = CurrentCol;
	while (am < sizeBoardWIDTH && sh < sizeBoardLENGTH && ticTacToe[sh][am] == 2) {
		am++;
		sh++;
		counter++;
	}
	CurrentCol--;
	CurrentRow--;
	while (CurrentCol > -1 && CurrentRow > -1 && ticTacToe[CurrentRow][CurrentCol] == 2) {
		CurrentCol--;
		CurrentRow--;
		counter++;
	}
	if (counter == howManyInARow) {
		gameOver = true;
		return true;
	}
	return false;
}