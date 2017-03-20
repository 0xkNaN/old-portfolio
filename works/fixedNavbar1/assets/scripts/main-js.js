

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



