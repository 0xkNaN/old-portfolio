
const loader  = document.getElementById("loader");
const canvas  = document.getElementById("particles-canvas");
const filter  = document.getElementById("main-filter");
const mainNav = document.getElementsByClassName("main-nav")[0];
const nav     = document.getElementsByClassName("nav")[0];
const nav_btn = document.getElementsByClassName("nav-mob-btn")[0];


// Canavs 
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
function showLoader(state,t) {
  if(state) {
    filter.style.display = "";
    loader.style.display = "";
    loader.classList.add("show");
  } else {
    setTimeout(function() {
      filter.style.display = "none";
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
    showLoader(true, 0);
    setTimeout(function() {
      showLoader(false, 950);
    }, 10);
    
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
showLoader(true, 0);

iniCanvas()
showLoader(false, 1300);
/*
document.body.onload = function() {
  iniCanvas()
  showLoader(false, 1300);
};
*/
document.body.onclick = function(e) {
  e = e || window.event;
  console.log("X  : ", e.screenX);
  console.log("Y  : ", e.screenY);
  console.log(e);
};
