

var navScroll = document.getElementsByClassName("main-header")[0];
var navMobile = document.getElementsByClassName("main-nav")[0];
var navOp = document.getElementsByClassName("nav-btn")[0];
var navCl = document.getElementsByClassName("nav-cl")[0];

navOp.onclick = function() {
	navMobile.style.display = "block";
	navCl.style.display = "block";
}
navCl.onclick = function() {
	navMobile.style.display = "";
	navCl.style.display = "";
}

window.onscroll = function() {
	if(document.body.scrollTop || document.documentElement.scrollTop) {
		if(!navScroll.classList.contains("scrolled"))
			navScroll.classList.add("scrolled");
	} else {
		navScroll.classList.remove("scrolled");
	}
}