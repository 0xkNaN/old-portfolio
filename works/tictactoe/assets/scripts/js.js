
var tic = {
	coder         : "Hassen Rmili",
	gameStates    : ["ini","start", "end"],
	currGameState : "",
	playersSign   : {
						"x" : "<img class=\"played-move\" src=\"assets/images/pX.png\" alt=\"\">",
						"o" : "<img class=\"played-move\" src=\"assets/images/pO.png\" alt=\"\">"
					},
	playerSign    : "",
	aiSign        : "",
	players       : ["player", "ai"],
	currPlayer    : "",
	playerMoves   : [],
	aiMoves       : [],
	aiStates      : ["attack", "defense"],
	currAiState   : "",
	aiStrColl     : ["AI", "AII", "AIII", "AIIII", "AIIV"],
	currAiStr     : "",
	aiFlowStates  : ["inTrack", "outTrack"],
	cAiFlowState  : "",
	boxesList     : ["box-1-1", "box-1-2", "box-1-3", "box-2-1", "box-2-2", "box-2-3", "box-3-1", "box-3-2", "box-3-3"],
	boxesWinList  : [
						["box-1-1", "box-1-2", "box-1-3"],
						["box-2-1", "box-2-2", "box-2-3"],
						["box-3-1", "box-3-2", "box-3-3"],
						["box-1-1", "box-2-1", "box-3-1"],
						["box-1-2", "box-2-2", "box-3-2"],
						["box-1-3", "box-2-3", "box-3-3"],
						["box-1-1", "box-2-2", "box-3-3"],
						["box-1-3", "box-2-2", "box-3-1"]
					],
	updateGame    : function(state, move) {
						switch(state) {
							case "ini" :
								tic.playerMoves  = [];
								tic.aiMoves      = [];
								tic.currAiStr    = tic.aiStrColl[0];
								tic.cAiFlowState = tic.aiFlowStates[0];
								if(tic.currAiState === tic.aiStates[0])	{
									tic.currPlayer    = tic.players[1];
								} else {
									tic.currPlayer    = tic.players[0];
								}
								
								tic.boxesList.forEach(function(box) {
									document.getElementById(box).innerHTML = "";
								});
								// Start...
								tic.updateGame("start");
								break;
								
							case "start" :
								var gameLog = document.getElementById("game-states");
								gameLog.innerHTML = "go !";
								tic.animCont(gameLog, "gameStatesAnim", "unset");
								tic.currAiState = tic.aiStates[1];
								setTimeout(function() {
									tic.animCont(gameLog, "gameStatesAnim", "set");
									tic.currGameState = tic.gameStates[1];
									// Start AI
									if(tic.currPlayer === tic.players[1]) {
										tic.currAiState = tic.aiStates[0];
										setTimeout(function() {
											tic.updateGame("ai");
										}, 800);
									}
								}, 200);
								break;
							
							case "move" :
								if(tic.currPlayer === tic.players[0] && tic.currGameState === tic.gameStates[1]) {
									var c = document.getElementById(move);
									if(tic.playerMoves.indexOf(move) === -1 && tic.aiMoves.indexOf(move) === -1 ) {	
										c.innerHTML = tic.playerSign;
										tic.playerMoves.push(move);
										
										// change currGameState to "end"
										tic.currGameState = tic.gameStates[2];
										tic.endGame("player");
									}
								}
								break;
								
							case "ai" :
								setTimeout(function() {
									var aiMove   = "";
									var boxCol_1 = ["box-2-2"];
									var boxCol_2 = ["box-1-1", "box-1-3", "box-3-1", "box-3-3"];
									var boxCol_3 = ["box-1-2", "box-2-1", "box-2-3", "box-3-2"];
									var remBoxes = tic.boxesList.filter(function(box) {
											var ocu = tic.playerMoves.concat(tic.aiMoves);
											return ocu.indexOf(box) === -1;
										});
										
									// helpers 
									function closest(box) {
										var clos = "";
										switch (box) {
											case "box-1-2" :
												clos = ["box-1-1", "box-1-3"][Math.floor(Math.random() * 2)];
												break;
											case "box-2-1" :
												clos = ["box-1-1", "box-3-1"][Math.floor(Math.random() * 2)];
												break;
											case "box-2-3" :
												clos = ["box-1-3", "box-3-3"][Math.floor(Math.random() * 2)];
												break;
											case "box-3-2" :
												clos = ["box-3-1", "box-3-3"][Math.floor(Math.random() * 2)];
												break;
										}
										return clos;
									}
									
									function bare(box) {
										var bar = "";
										switch(box) {	
											case "box-1-1" :
												bar = "box-3-3";
												break;
											case "box-1-2" :
												bar = "box-3-2";
												break;
											case "box-1-3" :
												bar = "box-3-1";
												break;
											case "box-2-1" :
												bar = "box-2-3";
												break;
											case "box-2-2" :
												bar = "box-2-2";
												break;
											case "box-2-3" :
												bar = "box-2-1";
												break;
											case "box-3-1" :
												bar = "box-1-3";
												break;
											case "box-3-2" :
												bar = "box-1-2";
												break;
											case "box-3-3" :
												bar = "box-1-1";
												break;
										}
										return bar;
									}
									
									function doubleBare(box1, box2) {
										var dBar = "";
										switch(box1) {
											case "box-1-2" :
												switch(box2) {
													case "box-1-1" :
														dBar = "box-3-1";
														break;
													case "box-1-3" :
														dBar = "box-3-3";
														break;
												}
												break;
											case "box-2-1" :
												switch(box2) {	
													case "box-1-1" :
														dBar = "box-1-3";
														break;
													case "box-3-1" :
														dBar = "box-3-3";
														break;
												}
												break;
											case "box-2-3" :
												switch(box2) {	
													case "box-1-3" :
														dBar = "box-1-1";
														break;
													case "box-3-3" :
														dBar = "box-3-1";
														break;
												}
												break;
											case "box-3-2" :
												switch(box2) {	
													case "box-3-1" :
														dBar = "box-1-1";
														break;
													case "box-3-3" :
														dBar = "box-1-3";
														break;
												}
												break;
											
										}
										return dBar;
									}
									
									function helperStr3(bx1, bx2) {
										var str3Ret = "";
										switch(bx1) {
											case "box-1-1" :
												switch(bx2) {
													case "box-2-3" :
													case "box-2-1" :
														str3Ret = "box-3-1";
														break;
													case "box-1-2" :
													case "box-3-2" :
														str3Ret = "box-1-3";
														break;
												}
												break;
											case "box-1-3" :
												switch(bx2) {
													case "box-2-3" :
													case "box-2-1" :
														str3Ret = "box-3-3";
														break;
													case "box-1-2" :
													case "box-3-2" :
														str3Ret = "box-1-1";
														break;
												}
												break;
											case "box-3-1" :
												switch(bx2) {
													case "box-3-2" :
													case "box-1-2" :
														str3Ret = "box-3-3";
														break;
													case "box-2-1" :
													case "box-2-3" :
														str3Ret = "box-1-1";
														break;
												}
												break;
											case "box-3-3" :
												switch(bx2) {
													case "box-3-2" :
													case "box-1-2" :
														str3Ret = "box-3-1";
														break;
													case "box-2-3" :
													case "box-2-1" :
														str3Ret = "box-1-3";
														break;
												}
												break;
										}
										return str3Ret;
									}
									
									function helperStr4(bx) {
										var str4Ret = [];
										switch(bx) {
											case "box-1-1":
												str4Ret = [["box-3-2","box-2-3"], ["box-3-1","box-1-3"]];
												break;
											case "box-1-3":
												str4Ret = [["box-2-1","box-3-2"], ["box-1-1","box-3-3"]];
												break;
											case "box-3-1":
												str4Ret = [["box-1-2","box-2-3"], ["box-1-1","box-3-3"]];
												break;
											case "box-3-3":
												str4Ret = [["box-2-1","box-1-2"], ["box-3-1","box-1-3"]];
												break;
										}
										return str4Ret;
									}
									
									switch(tic.currAiState) {
										case "attack"  :
											switch(tic.cAiFlowState) {
												case "inTrack" :
													switch(tic.aiMoves.length) {
														case 0 :
															var randStr   = tic.aiStrColl[(Math.floor(Math.random() * 4)) + 1];
															tic.currAiStr = randStr;
															switch(tic.currAiStr) {
																case tic.aiStrColl[1] :
																	aiMove = boxCol_1[0];
																	break;
																case tic.aiStrColl[2] :
																	aiMove = boxCol_2[Math.floor(Math.random() * 4)];
																	break;
																case tic.aiStrColl[3] :
																	aiMove = boxCol_1[0];
																	break;
																case tic.aiStrColl[4] :
																	aiMove = boxCol_2[Math.floor(Math.random() * 4)];
																	break;
															}
															break;
														
														case 1 :
															switch(tic.currAiStr) {
																case tic.aiStrColl[1] :
																	if(-1 < boxCol_3.indexOf(tic.playerMoves[0])) {
																		aiMove = closest(tic.playerMoves[0]);
																	} else {
																		tic.currAiStr = tic.aiStrColl[3];
																		tic.updateGame("ai");
																	}
																	break;
																case tic.aiStrColl[2] :
																	if(tic.playerMoves[tic.playerMoves.length -1] === boxCol_1[0]) {
																		aiMove = bare(tic.aiMoves[0]);
																	} else {
																		tic.cAiFlowState = tic.aiFlowStates[1];
																	}
																	break;
																case tic.aiStrColl[3] :
																	if(-1 < boxCol_2.indexOf(tic.playerMoves[0])) {
																		aiMove = bare(tic.playerMoves[0]);
																	} else {
																		tic.currAiStr = tic.aiStrColl[1];
																		tic.updateGame("ai");
																	}
																	break;
																case tic.aiStrColl[4] :
																	if(tic.playerMoves[tic.playerMoves.length -1] === boxCol_1[0]) {
																		aiMove = helperStr4(tic.aiMoves[0])[0][0];
																	} else {
																		tic.cAiFlowState = tic.aiFlowStates[1];
																	}
																	break;
															}
															break;
														
														case 2 :
															switch(tic.currAiStr) {
																case tic.aiStrColl[1] :
																	if(tic.playerMoves[tic.playerMoves.length - 1] === bare(tic.aiMoves[tic.aiMoves.length - 1])) {
																		aiMove = doubleBare(tic.playerMoves[0], tic.aiMoves[1]);
																	} else {
																		tic.cAiFlowState = tic.aiFlowStates[1];
																	}
																	break;
																case tic.aiStrColl[2] :
																	if(-1 < boxCol_2.indexOf(tic.playerMoves[tic.playerMoves.length -1])) {
																		aiMove = bare(tic.playerMoves[tic.playerMoves.length -1]);
																	} else {
																		tic.cAiFlowState = tic.aiFlowStates[1];
																	}
																	break;
																case tic.aiStrColl[3] :
																	if(-1 < boxCol_3.indexOf(tic.playerMoves[tic.playerMoves.length -1])) {
																		aiMove = helperStr3(tic.playerMoves[0], tic.playerMoves[1]);
																	} else {
																		tic.cAiFlowState = tic.aiFlowStates[1];
																	}
																	break;
																case tic.aiStrColl[4] :
																	tic.cAiFlowState = tic.aiFlowStates[1];
																	break;
															}
															break;
														
														case 3 :
															switch(tic.currAiStr) {
																case tic.aiStrColl[1] :
																	tic.cAiFlowState = tic.aiFlowStates[1];
																	break;
																case tic.aiStrColl[2] :
																	tic.cAiFlowState = tic.aiFlowStates[1];
																	break;
																case tic.aiStrColl[3] :
																	tic.cAiFlowState = tic.aiFlowStates[1];
																	break;
															}
															break;
													}
													break;
													
												case "outTrack" :
													tic.cAiFlowState = tic.aiFlowStates[1];
													break;
											}
											break;
											
										case "defense" :
											switch(tic.playerMoves.length) {
												case 1 :
													if(tic.playerMoves[0] === boxCol_1[0]) {
														aiMove = boxCol_2[Math.floor(Math.random() * 4)];
													} else {
														aiMove = boxCol_1[0];
													}
													break;
												case 2 :
													if(tic.playerMoves[0] === boxCol_1[0] && tic.playerMoves[1] === bare(tic.aiMoves[0])) {
														var remBoxCol_2 = boxCol_2.filter(function(bx) {
															return -1 < remBoxes.indexOf(bx);
														});
														aiMove = remBoxCol_2[Math.floor(Math.random() * remBoxCol_2.length)];
													
													} else if(tic.playerMoves[0] === bare(tic.playerMoves[1])) {
														var remBoxCol_3 = boxCol_3.filter(function(bx) {
															return -1 < remBoxes.indexOf(bx);
														});
														aiMove = remBoxCol_3[Math.floor(Math.random() * remBoxCol_3.length)];
													
													} else if(-1 < boxCol_2.indexOf(tic.playerMoves[0]) && -1 < helperStr4(tic.playerMoves[0])[0].indexOf(tic.playerMoves[1])){
														var idx =  helperStr4(tic.playerMoves[0])[0].indexOf(tic.playerMoves[1]);
														aiMove = helperStr4(tic.playerMoves[0])[1][idx];
													} else {
														tic.cAiFlowState = tic.aiFlowStates[1];
													}
													break;
												default :
													tic.cAiFlowState = tic.aiFlowStates[1];
													break;
											}
											break;
									}
									
									if(tic.cAiFlowState === tic.aiFlowStates[1]) {
										var playableCol = [];
										remBoxes.forEach(function(rem) {
											tic.boxesWinList.forEach(function(col) {
												if(-1 < col.indexOf(rem)){
													playableCol.push(col);
												}
											});
										});
										var potWin = playableCol.filter(function(col) {
											return tic.playerMoves.every(function(iCol) {
												return -1 === col.indexOf(iCol); 
											});
										});
										
										var potWinIn = [];
										potWin.forEach(function(col) {
											var inBox = 0;
											col.forEach(function(b) {
												if(-1 < tic.aiMoves.indexOf(b)) {
													inBox += 1;
												}
											});
											potWinIn.push([inBox, col]); 
										});
										var potWinR = potWin;
										potWinIn = potWinIn.sort().filter(function(fBox) {
											return 1 < fBox[0];
										});
										var playerPotWin = [];
										playableCol.forEach(function(col) {
											var playerCol = 0;
											col.forEach(function(pb) {
												if(-1 < tic.playerMoves.indexOf(pb)) {
													playerCol +=1;
												}
											});
											playerPotWin.push([playerCol, col]);
										});
										playerPotWin = playerPotWin.sort().filter(function(fBox) {
											return 1 < fBox[0];
										});
										switch(potWinIn.length) {
											case 0 :
												switch(playerPotWin.length) {
													case 0 :
														var middle = remBoxes.indexOf("box-2-2");
														switch(middle) {
															case -1 :
																switch(potWinR.length) {		
																	case 0 :
																		aiMove = remBoxes[Math.floor(Math.random() * remBoxes.length)];
																		break;
																	default :	
																		var aiColRan = potWinR[0];
																		var aiRanBy  = [];
																		aiColRan.forEach(function(mv) {
																			if(-1 < remBoxes.indexOf(mv)) aiRanBy.push(mv);
																		});
																		aiMove = aiRanBy[Math.floor(Math.random() * aiRanBy.length)];
																	}	break;
																break;
															default :
																aiMove = "box-2-2";
																break;
														}
														break;
													default :
														var playerColWin = playerPotWin[0][1];
														var aiDefBy    = "";
														playerColWin.forEach(function(mv) {
															if(-1 < remBoxes.indexOf(mv)) aiDefBy = mv;
														});
														aiMove = aiDefBy;
														break;
												}
												break;
											default :
												var aiColWin   = potWinIn[potWinIn.length - 1][1];
												var aiWinBy    = "";
												aiColWin.forEach(function(mv) {
													if(-1 < remBoxes.indexOf(mv)) aiWinBy = mv;
												});
												aiMove = aiWinBy;
												break;
										}
									}
									
									if (aiMove !== "") {
										var c = document.getElementById(aiMove);
										c.innerHTML = tic.aiSign;
										tic.aiMoves.push(aiMove);
										
										// change currGameState to "end"
										tic.currGameState = tic.gameStates[2];
										tic.endGame("ai");
									}
									
								}, 700);
								break;
						}
					},
	endGame       : function(pinger) {
						var winStates = ["draw", "yes", "no"];
						var remBoxes = tic.playerMoves.concat(tic.aiMoves);
						var winners = [];
						var win = "";
						tic.currGameState = tic.gameStates[2];
						
						tic.boxesWinList.forEach(function(box) {
							var plWin = box.every(function(bx) { return -1 < tic.playerMoves.indexOf(bx); });
							var aiWin = box.every(function(bx) { return -1 < tic.aiMoves.indexOf(bx); });
							if(plWin === true) {winners.push("you win !"); winners.push(box); winners.push("player");}
							if(aiWin === true) {winners.push("ai win !"); winners.push(box); winners.push("ai");}
						});
						if(winners.length === 0) {
							if (remBoxes.length === 9){
								win = winStates[0];
							} else {
								win = winStates[2];
							}
						} else {
							win = winStates[1];
						}
						
						switch(win) {
							case "draw" :
								var gameLog = document.getElementById("game-states");
								gameLog.innerHTML = "draw !";
								tic.animCont(gameLog, "gameStatesAnim", "unset");
								setTimeout(function() {
									tic.animCont(gameLog, "gameStatesAnim", "set");
								}, 500);
								setTimeout(function() {
									tic.currGameState = tic.gameStates[0];
									tic.updateGame("ini");
								}, 2000);
								break;
								
							case "yes" :
								var gameLog = document.getElementById("game-states");
								var xScore = document.getElementById("x-score");
								var oScore = document.getElementById("o-score");
								switch(winners[2]) {
									case "player" :
										switch(tic.playerSign) {
											case tic.playersSign.x :
												var score = Number(xScore.innerHTML) + 1;
												xScore.innerHTML = "00".concat(score).slice(-2);
												break;
											case tic.playersSign.o :
												var score = Number(oScore.innerHTML) + 1;
												oScore.innerHTML = "00".concat(score).slice(-2);
												break;
										}
										break;
									case "ai" :
										switch(tic.aiSign) {
											case tic.playersSign.x :
												var score = Number(xScore.innerHTML) + 1;
												xScore.innerHTML = "00".concat(score).slice(-2);
												break;
											case tic.playersSign.o :
												var score = Number(oScore.innerHTML) + 1;
												oScore.innerHTML = "00".concat(score).slice(-2);
												break;
										}
										break;
								}
								var remColWin = tic.boxesList.filter(function(box) {
									return -1 === winners[1].indexOf(box);
								});
								
								gameLog.innerHTML = winners[0];
								tic.animCont(gameLog, "gameStatesAnim", "unset");
								setTimeout(function() {
									tic.animCont(gameLog, "gameStatesAnim", "set");
									remColWin.forEach(function(bx) {
										var box = document.getElementById(bx);
										box.innerHTML = "";
									});
								}, 500);
								setTimeout(function() {
									tic.currGameState = tic.gameStates[0];
									tic.updateGame("ini");
								}, 3000);
								break;
								
							case "no" :
								switch(pinger) {
									case "player" :
										tic.currPlayer = tic.players[1];
										tic.updateGame("ai");
										break;
									case "ai"  :
										tic.currPlayer = tic.players[0];
										break;
								}
								tic.currGameState = tic.gameStates[1];
								break;
						}
					},
	animCont      : function(el, cl, cond) {
						var iniClass = el.className;
						var setActionList  = ["add" , "update"];
						var action   = setActionList[0];
						var idxClass = -1;
						
						el.classList.forEach(function(iClass, idx) {
							if(iClass === cl) {
								action   = setActionList[1];
								idxClass = idx;
								iniClass = "";
								el.classList.forEach(function(c, i) {
									if(idx !== i) iniClass += " " + c;
								});
							}
						});
						switch(cond) {
							case "set"  :
								switch(action) {
									case "add"    :
										el.className = iniClass + " " + cl;
										break;
									case "update" :
										el.className = iniClass;
										setTimeout(function() {
											el.className = iniClass + " " + cl;
										}, 1);
										break;
								}
								break;
							case "unset"  :
								el.className = iniClass;
								break;
						}
					},
	iniGame       : function() {
						tic.playerSign   = "";
						tic.aiSign       = "";
						tic.currPlayer   = "";
						tic.currAiState  = "";
						tic.playerMoves  = [];
						tic.aiMoves      = [];
						tic.currAiStr    = tic.aiStrColl[0];
						tic.cAiFlowState = tic.aiFlowStates[0];
						var xSign        = document.getElementById("menu-x");
						var oSign        = document.getElementById("menu-o");
						var menu         = document.getElementById("menu");
						var pGrImg       = document.getElementById("play-ground-img");
						var game         = document.getElementById("game-ground");
						var scorePanel   = document.getElementById("score-container");
						
						tic.animCont(menu, "menuAnimDown", "set");
						tic.animCont(pGrImg, "pGrImgAnim", "set");
						xSign.onclick = function() { playerDecision("x"); }
						oSign.onclick = function() { playerDecision("o"); }
						function playerDecision(sign) {
							switch(sign) {
								case "x" :
									tic.playerSign = tic.playersSign.x;
									tic.aiSign     = tic.playersSign.o;
									tic.currPlayer = tic.players[0];
									break;
								case "o" :
									tic.playerSign = tic.playersSign.o;
									tic.aiSign     = tic.playersSign.x;
									tic.currPlayer = tic.players[1];
									break;
							}
							
							tic.animCont(menu, "menuAnimDown", "unset");
							tic.animCont(menu, "menuAnimFade", "set");
							setTimeout(function() {
								menu.style.display = "none";
								menu.style.opacity = "0";
							}, 3000);
							setTimeout(function() {
								tic.animCont(game, "gameGroundAnim", "set");
								tic.animCont(scorePanel, "scoreAnim", "set");
								setTimeout(function() {
									game.style.backgroundColor = "#101010";
									game.style.border = "10px solid #101010";
									game.style.boxShadow = "inset 0px 0px 2px 2px rgba(0, 0, 0, 0.42)";
									scorePanel.style.opacity = "1";
									
									// Start...
									tic.updateGame("start");
								}, 1000);
							}, 1000);
						}
					}
};

tic.iniGame();

