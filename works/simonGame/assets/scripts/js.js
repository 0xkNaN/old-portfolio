
var screen    = document.getElementById("screen");
var on        = document.getElementById("on");
var start     = document.getElementById("start");
var strict    = document.getElementById("strict");
var strictLed = document.getElementById("stictLed");
var box1      = document.getElementById("box-1");
var box2      = document.getElementById("box-2");
var box3      = document.getElementById("box-3");
var box4      = document.getElementById("box-4");

var simon = {
	coder         : "Hassen Rmili",
	simonGame	  : ["on", "off"],
	cSimonGame	  : "",
	currentGame   : ["simon", "player", "start"],
	pCurrentGame   : "",
	strictStates  : ["on", "off"],
	cStrict       : "",
	simonMoves    : [],
	playerMoves   : [],
	cSimonMoves   : 0,
	cPlayerMoves  : 0,
	iSimonMoves   : 0,
	iPlayerMoves  : 0,
	updateGame    : function(cond) {
						switch(cond) {
							case "start" :
								simon.ini();
								screen.innerHTML = "Game Start";
								setTimeout(function() { screen.innerHTML = "Count : " + simon.iSimonMoves; }, 1500);
								simon.pCurrentGame = simon.currentGame[0];
								simon.updateGame("nextMove");
								break;
							case "nextMove" :
								var randNextMove = "box " + Math.floor((Math.random() * 4) + 1);
								simon.simonMoves.push(randNextMove);
								simon.iSimonMoves += 1;
								screen.innerHTML = "Count : " + simon.iSimonMoves;
								simon.updateGame("doMoves");
								break;
							case "doMoves" :
								simon.pCurrentGame = simon.currentGame[0];
								screen.innerHTML = "Count : " + simon.iSimonMoves;
								setTimeout(function() {	
									var currMove = simon.simonMoves[simon.cSimonMoves];
									var boxId    = "box-" + currMove.split(" ")[1];
									var aBoxId   = "audio" + currMove.split(" ")[1];
									var currBox  = document.getElementById(boxId);
									var animBox  = "box" + currMove.split(" ")[1] + "Anim";
									var audioBox = document.getElementById(aBoxId);
									
									currBox.style.animationName = animBox;
									audioBox.play();
									
									setTimeout(function() {
										currBox.style.animationName = "";
										simon.cSimonMoves += 1;
										if(simon.cSimonMoves === simon.simonMoves.length) {
											simon.cSimonMoves  = 0;
											simon.pCurrentGame = simon.currentGame[1];
										} else {
											simon.updateGame("doMoves");
										}
									}, 701);
								}, 700);
								break;
							case "correct" :
								if (simon.simonMoves.length === 20) {
									setTimeout(function() {
										screen.innerHTML = "Victory !!!";
									}, 400);
									setTimeout(function() {
										simon.updateGame("start");
									}, 5000);
								} else {
									setTimeout(function() {
										screen.innerHTML = "Nice Move";
									}, 50);
									setTimeout(function() {
										simon.updateGame("nextMove");
									}, 2000);
								}
								break;
							case "false" :
								setTimeout(function() {
									screen.innerHTML = "Wrong Move";
								}, 400);
								if(simon.cStrict === simon.strictStates[0]) {
									setTimeout(function() {
										simon.updateGame("start");
									}, 2000);
								} else {
									setTimeout(function() {
										simon.updateGame("doMoves");
									}, 2000);
								}
								break;
							case "box 1" :
							case "box 2" :
							case "box 3" :
							case "box 4" :
								simon.playerMoves.push(cond);
								simon.pCurrentGame = simon.currentGame[2];
								
								var boxId  = "box-" + cond.split(" ")[1];
								var aBoxId = "audio" + cond.split(" ")[1];
								var currPlayerBox  = document.getElementById(boxId);
								var currPlayeraBox  = document.getElementById(aBoxId);
								var animPlayerBox  = "box" + cond.split(" ")[1] + "Anim";
								currPlayerBox.style.animationName = "";
								currPlayerBox.style.animationName = animPlayerBox;
								currPlayeraBox.play();
								if(simon.playerMoves[simon.cPlayerMoves] === simon.simonMoves[simon.cPlayerMoves]) {
									if(simon.cPlayerMoves + 1 === simon.simonMoves.length) {
										simon.playerMoves = [];
										simon.cPlayerMoves = 0;
										setTimeout(function() { 
											simon.updateGame("correct"); 
											currPlayerBox.style.animationName = "";
										}, 1000);
									} else {
										simon.cPlayerMoves += 1;
										setTimeout(function() {	
											simon.pCurrentGame = simon.currentGame[1]; 
											currPlayerBox.style.animationName = "";
										}, 1000);
									}
								} else {
									simon.playerMoves = [];
									simon.cPlayerMoves = 0;
									setTimeout(function() {	
										currPlayerBox.style.animationName = "";
										simon.updateGame("false"); 
									}, 1000);
								}
								break;
						}
					},
	ini           : function() {
						simon.cSimonGame  = simon.simonGame[0];
						screen.innerHTML = "Welcome !";
						simon.pCurrentGame = simon.currentGame[2]; 
						simon.cStrict = simon.strictStates[1];
						strictLed.style["color"] = "#424242";
						simon.simonMoves = [];
						simon.playerMoves = [];
						simon.iSimonMoves = 0;
						simon.iPlayerMoves = 0;
					},
	off           : function() {
						simon.cSimonGame = simon.simonGame[1];
						box1.style.animationName = "";
						box2.style.animationName = "";
						box3.style.animationName = "";
						box4.style.animationName = "";
						screen.innerHTML = "";
						strictLed.style["color"] = "#424242";
					}
};

// Player Moves
box1.onclick = function box1_U() {
	if(simon.pCurrentGame === simon.currentGame[1]) simon.updateGame("box 1");
};
box2.onclick = function box2_U() {
	if(simon.pCurrentGame === simon.currentGame[1]) simon.updateGame("box 2");
};
box3.onclick = function box3_U() {
	if(simon.pCurrentGame === simon.currentGame[1]) simon.updateGame("box 3");
};
box4.onclick = function box4_U() {
	if(simon.pCurrentGame === simon.currentGame[1]) simon.updateGame("box 4");
};

// Controls
on.onclick = function onOff() {
	if(on.innerHTML === "off") {
		on.innerHTML = "on";
		simon.off();
		setTimeout(function() {
			simon.off();
		}, 500);
	} else {
		on.innerHTML = "off";
		
		box1.style.animationName = "box1Anim";
		box2.style.animationName = "box2Anim";
		box3.style.animationName = "box3Anim";
		box4.style.animationName = "box4Anim";
		
		setTimeout(function() {
			box1.style.animationName = "";
			box2.style.animationName = "";
			box3.style.animationName = "";
			box4.style.animationName = "";
		}, 1001);
		
		simon.ini();
	}
}
start.onclick = function beginGame() {
	if(simon.cSimonGame === simon.simonGame[0]) {	
		simon.updateGame("start");
	}
}
strict.onclick = function strictMode() {
	var led = strictLed.style["color"];
	if(simon.cSimonGame === simon.simonGame[0]) {
		if(led !== "red") {
			strictLed.style["color"] = "red";
			simon.cStrict = simon.strictStates[0];
		} else {
			strictLed.style["color"] = "#424242";
			simon.cStrict = simon.strictStates[1];
		}
	}
}
