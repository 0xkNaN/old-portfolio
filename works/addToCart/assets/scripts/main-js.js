

var chartBtn = document.getElementsByClassName("add-cart-btn")[0];
var chart = document.getElementsByClassName("add-cart")[0];
var chartItem = document.getElementsByClassName("add-cart-item-num")[0];
var chartState = "hidden";

chartBtn.onclick = function() {
	chartBtn.classList.add("clicked");
	setTimeout(function() {
		chartBtn.classList.remove("clicked");
	},150);
	
	/* Cart Animation */
	chartItem.innerText = +chartItem.innerText +1;
	chart.classList.add("up");
}