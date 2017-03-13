
/* Loader */
function showLoader(state, t, canvasState) {
  var loader = document.getElementById("loader");
  var canvas = document.getElementById("particle-canvas");
  var mainNav = document.getElementsByClassName("main-nav")[0];
  if(state) {  
    canvas.style.display = "none";
    canvas.innerHTML = "";
    mainNav.style.display = "none";
    loader.style.display = "";
    loader.classList.add("show");
  } else {
    if(canvasState) {
      canvas.style.display = "block";
      
      // Canavs ini
      var options = {
        particleColor: '#888',   // #f44336 | #888
        background: 'assets/images/home_bg.jpg',
        interactive: true,
        speed: 'medium',
        density: 'high'
      };
      var particleCanvas = new ParticleNetwork(canvas, options);
    }
    
    setTimeout(function() { 
      mainNav.style.display = "";
      mainNav.classList.add("popup");
      loader.classList.remove("show");
      setTimeout(function() {
        loader.style.display = "none";
        mainNav.classList.remove("popup");
      }, t);
    }, t);
  }
}


/* Nav */
var nav = document.getElementsByClassName("nav")[0];
nav.onclick = function(e) {
  e = e || window.event;
  if(e.target.nodeName == "A") {
    
    // Collapsed Nav
    nav.style.display = "";
    
    if(e.target.innerHTML == "Blog") return;
    
    e.preventDefault();
    
    // Loader
    if(e.target.getAttribute("href") == "#home") {
      showLoader(true, 0, true);
      showLoader(false, 1000, true);
    } else {
      showLoader(true, 0, false);
      showLoader(false, 1000, false);
    } 
    
    // tabs
    var tabs = Array.from(nav.children);
    tabs.forEach(function(t){
      t.classList.remove("active");
    });
    e.target.classList.add("active");
    
    // sections
    var cSIdx = e.target.getAttribute("href").slice(1);
    var curSection = document.getElementById(cSIdx);
    var sectionsArr = document.getElementsByClassName("i-section");
    var sections = Array.from(sectionsArr);
    
    sections.forEach(function(s) {
      s.classList.remove("selected-section");
    });
    curSection.classList.add("selected-section");
  }
}


var nav_btn = document.getElementsByClassName("nav-mob-btn")[0];
nav_btn.onclick = function() {
  nav.style.display = "block";
}

/* ini */
showLoader(true, 0, false);
document.body.onload = showLoader(false, 1000, true);
