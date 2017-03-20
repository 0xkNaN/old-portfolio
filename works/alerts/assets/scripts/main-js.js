

var alertCL = document.getElementsByClassName("alert-cl");
for(var i = 0; i < alertCL.length; i++) {
	alertCL[i].onclick = function() {
		var alert = event.target.parentElement;
		alert.style.opacity = 0.1;
		setTimeout(function() {
			alert.style.display = "none";
		}, 1000);
	}
}