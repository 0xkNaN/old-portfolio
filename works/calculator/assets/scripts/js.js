
var calcs = document.getElementById("calcs");
var results = document.getElementById("results");

var calc = {
	coder    : "Hassen Rmili",
	pwStates : ["on", "off"],
	cPwState : "", 
	states   : ["calc", "result"],
	cState   : "",
	uStates  : ["dot", "int", "sign"],
	pUState  : [],
	allowDot : true,
	pResult  : 0,
	makeCalc :  function() {
					if(calc.cPwState === calc.pwStates[0]) {
						var equ = calcs.value;
						var ops = equ.replace(/[+\-*\/]/g, function(sign) {
							return " " + sign + " ";
						}).split(" ").map(function(op) {
							return ((op === "") ? "0" : op);
						}).map(function(op) {
							return ((op === "R") ? calc.pResult : op);
						});
						
						if(calc.pUState[calc.pUState.length - 1] === calc.uStates[2]) {
							calc.pResult = 0;
							results.innerHTML = "Error";
						} else {
							var result = ops, phase1 = ["*", "/"], phase2 = ["+", "-"], currPhase = phase1;
							while(1 < result.length) {
								var tmpResult = [];
								if(result.indexOf(phase1[0]) === -1 && result.indexOf(phase1[1]) === -1) currPhase = phase2;
								var currSign = function() {
									var fSign = result.indexOf(currPhase[0]);
									var sSign = result.indexOf(currPhase[1]);
									var _ret = "";
									if(fSign === -1) {
										_ret = [currPhase[1], sSign];
									} else if(sSign === -1) {
										_ret = [currPhase[0], fSign];
									} else if(fSign !== -1 && sSign !== -1){
										_ret = ((fSign < sSign) ? [currPhase[0], fSign] : [currPhase[1], sSign]);
									}
									return _ret;
								}
								
								var newHdk = function() {
									var _sXY = 0;
									var xNum = result[currSign()[1] - 1];
									var yNum = result[currSign()[1] + 1];
									var opXY = result[currSign()[1]];
									
									switch(opXY) {
										case "/" :
											_sXY = Number(xNum) / Number(yNum);
											break;
										case "*" :
											_sXY = Number(xNum) * Number(yNum);
											break;
										case "-" :
											_sXY = Number(xNum) - Number(yNum);
											break;
										case "+" :
											_sXY = Number(xNum) + Number(yNum);
											break;
									}
									return _sXY;
								}
								
								tmpResult = result.slice(0, currSign()[1] - 1).concat(newHdk()).concat(result.slice(currSign()[1] + 2));
								result = tmpResult;
							}
							
							results.innerHTML = ((result[0] % 1 != 0) ? result[0].toString().slice(0,15) : result[0]);
							calc.pResult = results.innerHTML;
						}
						
						calcs.value = equ;
						calc.cState = calc.states[1];
					}
				},
	update   :  function(button, type) {
					if((calcs.value.length <= 18 && calc.cPwState === calc.pwStates[0]) || type === "del" || calc.cState === calc.states[1]) {
						if(calc.cState === calc.states[1]) {
							calc.reset();
							if(type === "sign" && calc.pResult !== 0 && calc.pResult !== "Infinity" && calc.pResult !== "-Infinity" && calc.pResult !== "NaN") {
								calcs.value = "R";
								calc.pUState.push(calc.uStates[1]);
							}
							calc.cState = calc.states[0];
						}
						switch(type) {
							case "dot"  :
								if(calc.allowDot === true || calcs.value.length === 0) {
									calcs.value += button;	
									calc.allowDot = false;
									calc.pUState.push(calc.uStates[0]);
								}
								break;
							case "int"  :
								calcs.value += button;
								calc.pUState.push(calc.uStates[1]);
								break;
							case "sign" :
								if(calc.pUState[calc.pUState.length - 1] === calc.uStates[0] || calc.pUState[calc.pUState.length - 1] === calc.uStates[1]) {
									calcs.value += button;
									calc.allowDot = true;
									calc.pUState.push(calc.uStates[2]);
								} else if (calc.pUState[calc.pUState.length - 1] === calc.uStates[2]) {
									calcs.value = calcs.value.slice(0,-1) + button;
								} else if (button === "-") {
									calcs.value += button;
								}
								break;
							case "del"  :
								if(0 < calcs.value.length) {
									calcs.value = calcs.value.slice(0, -1);
									var checkDot = calc.pUState.pop();
									switch(checkDot) {
										case "dot"  :
											calc.allowDot = true;
											break;
										case "sign" :
											var lastDot  = calc.pUState.lastIndexOf("dot");
											var lastSign = calc.pUState.lastIndexOf("sign");
											if(lastDot < lastSign) {
												calc.allowDot = true;
											} else {
												calc.allowDot = false;
											}
											break;
									}
								}
								break;
						}
					}
				},
	reset    :  function() {
					if(calc.cPwState === calc.pwStates[0]) {
						calcs.value       = "";
						results.innerHTML = "0";
						calc.cState  = ""; 
						calc.pUState = [];
						calc.allowDot = true;
					}
				},
	power    :  function() {
					if(calc.cPwState === calc.pwStates[0]) {
						calc.reset();
						results.innerHTML = "";
						calc.cPwState = calc.pwStates[1];
					} else {
						calc.ini();
					}
				},
	ini      :  function() {
					calc.cPwState = calc.pwStates[0];
					calc.reset();
				},
}

/** Buttons **/
function clickedButton(click) {
	switch (click) {
		case "ON":
			calc.power();
			break;
		case "AC":
			calc.reset();
			break;
		case "CE":
			calc.update(click, "ce");
			break;
		case "DEL":
			calc.update(click, "del");
			break;
		case "=":
			calc.makeCalc();
			break;
		case "." :
			calc.update(click, "dot");
			break;
		case "0" :
		case "1" :
		case "2" :
		case "3" :
		case "4" :
		case "5" :
		case "6" :
		case "7" :
		case "8" :
		case "9" :
			calc.update(click, "int");
			break;
		case "+" :
		case "-" :
		case "*" :
		case "/" :
			calc.update(click, "sign");
			break;
	}
}

calc.ini();