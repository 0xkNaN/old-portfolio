
var title = document.getElementById("pomodoro-title");
var clock_setting_state = "ini";
var timer = document.getElementById("timer-on");
var restart = document.getElementById("restart-on");
var time = document.getElementById("timer-time");
var min = document.getElementById("timer-time-min");
var sec = document.getElementById("timer-time-sec");
var tIntervale;
var session_time = document.getElementById("session-length-time");
var session_plus = document.getElementById("session-length-plus");
var session_minus = document.getElementById("session-length-minus");
var break_time = document.getElementById("break-length-time");
var break_plus = document.getElementById("break-length-plus");
var break_minus = document.getElementById("break-length-minus");

var pomodoro = {
	coder             : "Hassen Rmili",
	clockStates       : ["session", "break"],
	timerStates       : ["Start", "Stop"],
	currentClockState : "",
	currentTimerState : "",
	session_min       : "",
	session_sec       : "",
	break_min         : "",
	break_sec         : "",
	current_time_min  : "",
	current_time_sec  : "",
	updateTimer       : function() {
							var timeTime = (Number(pomodoro.current_time_min) * 60) + Number(pomodoro.current_time_sec);
							if (timeTime === 0) { 
								clearInterval(tIntervale);
								pomodoro.currentClockState = ((pomodoro.currentClockState === pomodoro.clockStates[0]) ? pomodoro.clockStates[1] : pomodoro.clockStates[0]);
								pomodoro.timerClockState();
							} else {
								if (timeTime % 60 === 0) min.innerHTML = Number(pomodoro.current_time_min) - 1;
								timeTime -= 1;
								sec.innerHTML = ("00" + timeTime % 60).slice(-2);
								
								pomodoro.current_time_min = min.innerHTML;
								pomodoro.current_time_sec = sec.innerHTML;
							}
						},
	timerSwitcher     : function() {
							if (pomodoro.currentTimerState === pomodoro.timerStates[1]) {
								tIntervale = setInterval(pomodoro.updateTimer,1000);
								pomodoro.currentTimerState = pomodoro.timerStates[0];
								clock_setting_state = "run";
							} else {
								clearInterval(tIntervale);
								pomodoro.currentTimerState = pomodoro.timerStates[1];
								clock_setting_state = "ini";
							}
							
							console.log(pomodoro.currentTimerState);
						},
	timerClockState   : function() {
							if (pomodoro.currentClockState === "session") {
								pomodoro.currentClockState = pomodoro.clockStates[0];
								pomodoro.currentTimerState = pomodoro.timerStates[0];
								clearInterval(tIntervale);
								pomodoro.current_time_min = pomodoro.session_min;
								pomodoro.current_time_sec = pomodoro.session_sec;
							} else {
								pomodoro.currentClockState = pomodoro.clockStates[1];
								pomodoro.currentTimerState = pomodoro.timerStates[0];
								clearInterval(tIntervale);
								pomodoro.current_time_min = pomodoro.break_min;
								pomodoro.current_time_sec = pomodoro.break_sec;
							}
							
							title.innerHTML = pomodoro.currentClockState;
							tIntervale = setInterval(pomodoro.updateTimer,1000);
						},
	ini               : function() {
							title.innerHTML = pomodoro.clockStates[0];
							
							pomodoro.currentClockState = pomodoro.clockStates[0];
							pomodoro.currentTimerState = pomodoro.timerStates[1];
							
							pomodoro.session_min = session_time.innerHTML;
							pomodoro.session_sec = "00";
							pomodoro.break_min   = break_time.innerHTML;
							pomodoro.break_sec   = "00";
							
							pomodoro.current_time_min = pomodoro.session_min;
							pomodoro.current_time_sec = pomodoro.session_sec;
							
							min.innerHTML = pomodoro.session_min;
							sec.innerHTML = pomodoro.session_sec;
							
							clearInterval(tIntervale);
							console.log("Ini Set");
						}
}


session_plus.onclick = function sessionPlus () { 
	if (0 <= session_time.innerHTML) session_time.innerHTML =  Number(session_time.innerHTML) + 1; 
	if (clock_setting_state === "ini") pomodoro.ini();
}
session_minus.onclick = function sessionMinus () { 
	if (0 < session_time.innerHTML) session_time.innerHTML =  Number(session_time.innerHTML) - 1;
	if (clock_setting_state === "ini") pomodoro.ini();
}
break_plus.onclick = function breakPlus () { 
	if (0 <= break_time.innerHTML) break_time.innerHTML =  Number(break_time.innerHTML) + 1;
	if (clock_setting_state === "ini") pomodoro.ini();
}
break_minus.onclick = function breakMinus () { 
	if (0 < break_time.innerHTML) break_time.innerHTML =  Number(break_time.innerHTML) - 1;
	if (clock_setting_state === "ini") pomodoro.ini();
}

timer.onclick   = function() { pomodoro.timerSwitcher(); }	
restart.onclick = function() { pomodoro.ini(); }

// INI
pomodoro.ini();
