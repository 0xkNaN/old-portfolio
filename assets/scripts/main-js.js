
const loader  = document.getElementById("loader");
const canvas  = document.getElementById("particles-canvas");
const filter  = document.getElementsByClassName("filter-home")[0];
const mainNav = document.getElementsByClassName("main-nav")[0];
const nav     = document.getElementsByClassName("nav")[0];
const nav_btn = document.getElementsByClassName("nav-mob-btn")[0];


// Canavs ini
function iniCanvas() {
  var options = {
    particleColor: '#888',   // #f44336 | #888
    background: 'assets/images/home_bg.jpg',
    interactive: true,
    speed: 'medium',
    density: 'high'
  };
  var particleCanvas = new ParticleNetwork(canvas, options);
}

/* Loader */
function showLoader(state, t, canvasState) {
  if(state) {  
    canvas.style.display = "none";
    mainNav.style.display = "none";
    loader.style.display = "";
    loader.classList.add("show");
  } else {
    if(canvasState) {
      canvas.style.display = "block";
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
nav.onclick = function(e) {
  e = e || window.event;
  if(e.target.nodeName == "A") {
    
    // Collapsed Nav
    nav.style.display = "";
    
    if(e.target.innerHTML == "Blog") return;
    
    e.preventDefault();
    
    // Loader
    if(e.target.getAttribute("href") == "#home") {
      showLoader(true, 0, false);
      showLoader(false, 1000, true);
      console.log("home");
    } else {
      showLoader(true, 0, false);
      showLoader(false, 1000, false);
      console.log("else");
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


nav_btn.onclick = function() {
  nav.style.display = "block";
}

/* ini */
iniCanvas();
showLoader(true, 0, false);
document.body.onload = function() {
  showLoader(false, 1000, true);
};
