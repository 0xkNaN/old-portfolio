
/* Selecting DOM */
var el_id = function(element, id) { return element.getElementById(id); }
var el_cl = function(element, cl) { return element.getElementsByClassName(cl); }
var el_tn = function(element, tn) { return element.getElementsByTagName(tn); }

var body = document.body;
var nav = document.getElementsByClassName("main-nav")[0];
var section_list = document.getElementsByTagName("section");
var canScroll = true;

function updateNav() {
	var sec_pos = [];
	var navDots = nav.getElementsByClassName("dot");
	for(var i = 0; i < section_list.length; i++) {
		var scrollTop = body.scrollTop || document.documentElement.scrollTop;
		sec_pos.push(section_list[i].offsetTop - scrollTop);
	}
	for(var j = 0;j < navDots.length; j++) {
		navDots[j].classList.remove("active")
	}
	var currentSectionIdx = sec_pos.findIndex(function(d) {
		return -(window.innerHeight / 2) <= d ;
	});
	navDots[currentSectionIdx].classList.add("active");
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
	if (event.target.nodeName == "SPAN") {
		event.preventDefault();
		var secLoc = event.target.parentNode.getAttribute("href");
		smoothedScroll(secLoc);
	}
	if (event.target.nodeName == "A") {
		event.preventDefault();
		var secLoc = event.target.getAttribute("href");
		smoothedScroll(secLoc);
	}
}


// ...
window.onscroll = function() {
	updateNav();
}


