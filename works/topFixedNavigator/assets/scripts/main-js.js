

/* Selecting DOM */
var el_id = function(element, id) { return element.getElementById(id); }
var el_cl = function(element, cl) { return element.getElementsByClassName(cl); }
var el_tn = function(element, tn) { return element.getElementsByTagName(tn); }

var body = document.body;
var canScroll = true;

var nav = el_cl(document,"main-nav")[0];
var navPosition = nav.offsetTop;
var content = el_cl(document,"content")[0];


function updateNav() {
	var scrollTop = body.scrollTop || document.documentElement.scrollTop;
	if (navPosition <= scrollTop) {
		nav.classList.add("sticked");
		content.style.marginTop = nav.clientHeight + "px";
	} else {
		nav.classList.remove("sticked");
		content.style.marginTop = "";
	}
}

function smoothedScroll (id) {
	if(canScroll) {
		canScroll = false;
		var scrollTo = el_id(document, id.slice(1));
		var scrollTarget = scrollTo.offsetTop;
		
		function frame() {
			var scrollTop = body.scrollTop || document.documentElement.scrollTop;
			var dist = scrollTarget - scrollTop;
			var updatedScroll = (0 <= dist)? Math.ceil(dist / 10) : Math.floor(dist / 10);
			window.scrollBy(0,updatedScroll);
			if(Math.abs(updatedScroll) == 0) {
				clearInterval(steps);
				canScroll = true;
			}
		}
		
		var steps = setInterval(frame, 25);
	}
}

nav.onclick = function(event) {
	event = event || window.event;
	if (event.target.nodeName == "A") {
		event.preventDefault();
		var secLoc = event.target.getAttribute("href");
		smoothedScroll(secLoc);
	}
}


// ...
window.onscroll = function(e) {
	updateNav();
}


