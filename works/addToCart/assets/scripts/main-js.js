

var chartBtns = document.getElementsByClassName("item-add-btn");
var chart = document.getElementsByClassName("add-cart")[0];
var chartItem = document.getElementsByClassName("add-cart-item-num")[0];
var chartState = "hidden";



//console.log(chartBtns);

for(var btn in chartBtns){
	chartBtns[btn].onclick = function() {
		var  b = this;
		b.classList.add("clicked");
		setTimeout(function() {
			b.classList.remove("clicked");
			chartItem.innerText = +chartItem.innerText +1;
			chart.classList.add("up");
		}, 100);
	}
}




/*

chartBtn.onclick = function() {
	chartBtn.classList.add("clicked");
	setTimeout(function() {
		chartBtn.classList.remove("clicked");
	},150);
	
	// Cart Animation 
	chartItem.innerText = +chartItem.innerText +1;
	chart.classList.add("up");
}*/