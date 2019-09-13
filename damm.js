// JavaScript source code	
var blue = 0;
var FirstClick = true;
var legalMove = false;
var turn = true;
var firstThis;
var blueWinner = 0;
var purpleWinner = 0;
var color = true;
var AudioWin = new Audio('sound/wingame.wav');
//////////     0=white       1=black     2=blue   3=purple  4=blueCrown  5=pupleCrown
var images = ["pic/white.jpg", "pic/black.jpg", "pic/b.png", "pic/b1.png", "pic/crown2.png", "pic/crown1.png"];
var damka =
	[
		[0, 2, 0, 2, 0, 2, 0, 2],
		[2, 0, 2, 0, 2, 0, 2, 0],
		[0, 2, 0, 2, 0, 2, 0, 2],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[3, 0, 3, 0, 3, 0, 3, 0],
		[0, 3, 0, 3, 0, 3, 0, 3],
		[3, 0, 3, 0, 3, 0, 3, 0],
	];
function changeBackground(color) {
	document.body.style.background = color;
}
window.addEventListener("load", function () { changeBackground('darkgray') });
function BuildBoard() {
	if (blue == 0) {
		document.getElementById("ss").innerHTML = ("blue's turn").fontcolor("blue").fontsize(5);
		blue = 1;
	}
	var num = 0;
	var textImgTag = "";
	var text = "<table border='1' align='center' style='background-color:black'>";
	var sh, am;
	for (sh = 0; sh < damka.length; sh++) {
		text = text + "<tr>"; //יצירת שורה
		for (am = 0; am < damka.length; am++) {
			textImgTag = "<img src=" + images[damka[sh][am]] + " style='widows:45px; height:45px' />";
			text = text + "<td id='" + num + "' onclick='SwitchPic(this);' style = width:45px; height:45px >" + textImgTag + "</td>";// יצירת משבצת בלוח
			num++;
		}
		text = text + "</tr>";
	}
	text = text + "</table>";
	document.getElementById("Start").innerHTML = text;
}
function SwitchPic(currentThis) {
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / 8);
	var CurrentCol = CurrentId % 8;
	if (FirstClick) {
		if ((damka[CurrentRow][CurrentCol] == 2 && turn == true && isTherePlaceToMove2(currentThis) == true) || damka[CurrentRow][CurrentCol] == 4 && turn == true) {
			firstThis = currentThis;
			FirstClick = !FirstClick;
			turn = false;
		}
		else if ((damka[CurrentRow][CurrentCol] == 3 && turn == false && isTherePlaceToMove3(currentThis) == true) || damka[CurrentRow][CurrentCol] == 5 && turn == false) {
			firstThis = currentThis;
			FirstClick = !FirstClick;
			turn = true;
		}
	}
	else {
		IsLegalMove(firstThis, currentThis);
		kingCheck(currentThis);
		if (legalMove == true) {
			if (color) {
				document.getElementById("ss").innerHTML = ("purple's turn").fontcolor("purple").fontsize(5);
				color = false;
			}
			else if (color == false) {
				document.getElementById("ss").innerHTML = ("blue's turn").fontcolor("blue").fontsize(5);
				color = true;
			}
			var innerHtmlFirstClick = firstThis.innerHTML;
			firstThis.innerHTML = currentThis.innerHTML;
			currentThis.innerHTML = innerHtmlFirstClick;
			FirstClick = !FirstClick;
		}
	}
	turn = !turn;
}
function IsLegalMove(firstClickElement, secondClickElement) {
	var firstId = firstClickElement.id;
	var secondId = secondClickElement.id;
	var firstRow = Math.floor(firstId / 8);
	var firstCol = firstId % 8;
	var secondRow = Math.floor(secondId / 8);
	var secondCol = secondId % 8;
	//הליכה רגילה
	if (damka[firstRow][firstCol] == 3 && damka[secondRow][secondCol] == 1 && secondRow == firstRow - 1 && secondCol == firstCol - 1 || damka[firstRow][firstCol] == 3 && damka[secondRow][secondCol] == 1 && secondRow == firstRow - 1 && secondCol == firstCol + 1
		||
		damka[firstRow][firstCol] == 2 && damka[secondRow][secondCol] == 1 && secondRow == firstRow + 1 && secondCol == firstCol + 1 || damka[firstRow][firstCol] == 2 && damka[secondRow][secondCol] == 1 && secondRow == firstRow + 1 && secondCol == firstCol - 1) {
		legalMove = true;
		var tempp = damka[firstRow][firstCol];
		damka[firstRow][firstCol] = 1;
		damka[secondRow][secondCol] = tempp;
	}
	//אכילה על ידי מלך סגול
	else if (damka[firstRow][firstCol] == 5) {
		if (secondRow == firstRow + 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow + 1][firstCol + 1] == 2 || damka[firstRow + 1][firstCol + 1] ==4)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow + 1][firstCol + 1] = 1;
			purpleWinner++;
			if (purpleWinner == 12) {
				alert("purple is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		else if (secondRow == firstRow + 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow + 1][firstCol - 1] == 2 || damka[firstRow + 1][firstCol - 1] == 4)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow + 1][firstCol - 1] = 1;
			purpleWinner++;
			if (purpleWinner == 12) {
				alert("purple is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		else if (secondRow == firstRow - 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow - 1][firstCol + 1] == 2 || damka[firstRow - 1][firstCol + 1] == 4)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow - 1][firstCol + 1] = 1;
			purpleWinner++;
			if (purpleWinner == 12) {
				alert("purple is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		else if (secondRow == firstRow - 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow - 1][firstCol - 1] == 2 || damka[firstRow - 1][firstCol - 1] == 4)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow - 1][firstCol - 1] = 1;
			purpleWinner++;
			if (purpleWinner == 12) {
				alert("purple is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		//הליכה על ידי מלך סגול
		else if (secondRow == firstRow + 1 && secondCol == firstCol + 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
		else if (secondRow == firstRow + 1 && secondCol == firstCol - 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
		else if (secondRow == firstRow - 1 && secondCol == firstCol + 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
		else if (secondRow == firstRow - 1 && secondCol == firstCol - 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
	}
	//אכילה על ידי מלך כחול
	else if (damka[firstRow][firstCol] == 4) {
		if (secondRow == firstRow + 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] == 5)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow + 1][firstCol + 1] = 1;
			blueWinner++;
			if (blueWinner == 12) {
				alert("blue is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		else if (secondRow == firstRow + 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow + 1][firstCol - 1] == 3 || damka[firstRow + 1][firstCol - 1] == 5)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow + 1][firstCol - 1] = 1;
			blueWinner++;
			if (blueWinner == 12) {
				alert("blue is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		else if (secondRow == firstRow - 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow - 1][firstCol + 1] == 3 || damka[firstRow - 1][firstCol + 1] == 5)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow - 1][firstCol + 1] = 1;
			blueWinner++;
			if (blueWinner == 12) {
				alert("blue is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		else if (secondRow == firstRow - 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1 && (damka[firstRow - 1][firstCol - 1] == 3 || damka[firstRow - 1][firstCol - 1] == 5)) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
			damka[firstRow - 1][firstCol - 1] = 1;
			blueWinner++;
			if (blueWinner == 12) {
				alert("blue is the winner!");
				document.getElementById("ss").innerHTML = ("the game is over!");
				AudioWin.play();
			}
		}
		//הליכה על ידי מלך כחול
		else if (secondRow == firstRow + 1 && secondCol == firstCol + 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
		else if (secondRow == firstRow + 1 && secondCol == firstCol - 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
		else if (secondRow == firstRow - 1 && secondCol == firstCol + 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
		else if (secondRow == firstRow - 1 && secondCol == firstCol - 1 && damka[secondRow][secondCol] == 1) {
			legalMove = true;
			var temppp = damka[firstRow][firstCol];
			damka[firstRow][firstCol] = damka[secondRow][secondCol];
			damka[secondRow][secondCol] = temppp;
		}
	}
	//אכילה
	else {
		if (damka[firstRow][firstCol] == 2 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol + 2 || secondCol == firstCol - 2) && secondRow == firstRow + 2) {
			if (secondCol == firstCol + 2 && (damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] == 5)) {
				var tempp = damka[firstRow][firstCol];
				damka[firstRow][firstCol] = 1;
				damka[firstRow + 1][firstCol + 1] = 1;
				damka[secondRow][secondCol] = tempp;
				blueWinner++;
				if (blueWinner == 12) {
					alert("blue is the winner!");
					document.getElementById("ss").innerHTML = ("the game is over!");
					AudioWin.play();
				}
			}
			if (secondCol == firstCol - 2 && (damka[firstRow + 1][firstCol - 1] == 3 || damka[firstRow + 1][firstCol - 1] == 5)) {
				var tempp = damka[firstRow][firstCol];
				damka[firstRow][firstCol] = 1;
				damka[firstRow + 1][firstCol - 1] = 1;
				damka[secondRow][secondCol] = tempp;
				blueWinner++;
				if (blueWinner == 12) {
					alert("blue is the winner!");
					document.getElementById("ss").innerHTML = ("the game is over!");
					AudioWin.play();
				}
			}
		}
		else if (damka[firstRow][firstCol] == 3 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol + 2 || secondCol == firstCol - 2) && secondRow == firstRow - 2) {
			if (secondCol == firstCol + 2 && (damka[firstRow - 1][firstCol + 1] == 2 || damka[firstRow - 1][firstCol + 1] == 4)) {
				var tempp = damka[firstRow][firstCol];
				damka[firstRow][firstCol] = 1;
				damka[firstRow - 1][firstCol + 1] = 1;
				damka[secondRow][secondCol] = tempp;
				purpleWinner++;
				if (purpleWinner == 12) {
					alert("purple is the winner!");
					document.getElementById("ss").innerHTML = ("the game is over!");
					AudioWin.play();
				}
			}
			if (secondCol == firstCol - 2 && (damka[firstRow - 1][firstCol - 1] == 2 || damka[firstRow - 1][firstCol - 1] == 4)) {
				var tempp = damka[firstRow][firstCol];
				damka[firstRow][firstCol] = 1;
				damka[firstRow - 1][firstCol - 1] = 1;
				damka[secondRow][secondCol] = tempp;
				purpleWinner++;
				if (purpleWinner == 12) {
					alert("purple is the winner!");
					document.getElementById("ss").innerHTML = ("the game is over!");
					AudioWin.play();
				}
			}
		}
		else
			legalMove = false;
	}
}
function kingCheck(currentThis) {
	var CurrentId = currentThis.id;
	var CurrentRow = Math.floor(CurrentId / 8);
	var CurrentCol = CurrentId % 8;
	if (damka[CurrentRow][CurrentCol] == 2 && CurrentRow == 7) {
		damka[CurrentRow][CurrentCol] = 4;
	}
	if (damka[CurrentRow][CurrentCol] == 3 && CurrentRow == 0) {
		damka[CurrentRow][CurrentCol] = 5;
	}
}
//בדיקות שהשחקן יכול לבצע מהלך
function isTherePlaceToMove2(firstClickElement) {
	var firstId = firstClickElement.id;
	var firstRow = Math.floor(firstId / 8);
	var firstCol = firstId % 8;
	if ((damka[firstRow][firstCol] == 2 && (damka[firstRow + 1][firstCol - 1] == 1 || damka[firstRow + 1][firstCol + 1] == 1))) {
		return true;
	}
	else if (damka[firstRow][firstCol] == 2 &&
		(((damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] == 5) && damka[firstRow + 2][firstCol + 2] == 1)
			||
			((damka[firstRow + 1][firstCol - 1] == 3 || damka[firstRow + 1][firstCol - 1] == 5) && damka[firstRow + 2][firstCol - 2] == 1)))
		return true;
	return false;

}
function isTherePlaceToMove3(firstClickElement) {
	var firstId = firstClickElement.id;
	var firstRow = Math.floor(firstId / 8);
	var firstCol = firstId % 8;
	if ((damka[firstRow][firstCol] == 3 && (damka[firstRow - 1][firstCol - 1] == 1 || damka[firstRow - 1][firstCol + 1] == 1))) {
		return true;
	}
	else if (damka[firstRow][firstCol] == 3 && (((damka[firstRow - 1][firstCol + 1] == 2 || damka[firstRow - 1][firstCol + 1] == 4) && damka[firstRow - 2][firstCol + 2] == 1)
		||
		((damka[firstRow - 1][firstCol - 1] == 2 || damka[firstRow - 1][firstCol - 1] == 4) && damka[firstRow - 2][firstCol - 2] == 1)))
		return true;

	return false;
}