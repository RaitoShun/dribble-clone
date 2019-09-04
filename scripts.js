const highlight = document.querySelector('.circle-r');
const landing = document.querySelector('.landing');
const cover = document.querySelector('.cover');
const play = document.querySelector('.youtube');
const bottomCircle = document.querySelector('.xspot');
const sliderPlay = document.querySelector('.filler');
const text = document.querySelector('.bottomtext');
const mText = document.querySelector('.middletext');
const iconX = document.querySelector('.xmark');
const chevron = document.querySelector('.fa-chevron-down');
const soundGif = document.querySelector('.soundgif');
const title = document.querySelectorAll('.uppertext');
const info = document.querySelectorAll('.infostuff');
const images = document.querySelectorAll('img');
const nav = document.querySelector('.navbar');
const scroller = document.querySelector('.scroller');
const infobox = document.querySelectorAll('.infobox');
const counter = document.getElementById('myCanvas').getContext('2d');
const video = document.querySelector('video');
const canvas = document.getElementById('myCanvas');
const menu = document.querySelector('.fa-bars');
const navMenu = document.querySelector('.navlist');

/*Start up of the page*/

function Load() {
	const initCoords = play.getBoundingClientRect();

	const coords = {
		width: initCoords.width,
        height: initCoords.height,
        top: initCoords.top - play.top,
        left: initCoords.left - play.left 
	}

  highlight.style.width = `${coords.width- 3}px`;
  highlight.style.height = `${coords.height - 3}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px )`;
  
  scroller.scrollTop = 0;

  nav.style.transform = 'translateY(0%)';
  nav.style.opacity = 1;

  text.style.transform = 'translateY(-150%)';
  text.style.opacity = 1;

  mText.style.transform = 'translateY(-120%)';
  mText.style.opacity = 1;

  chevron.style.transform = 'translateY(0%)';
  chevron.style.opacity = 1;

  play.style.opacity = 1;
  play.style.transform = 'translateY(0%)';
}
/*Stuff for circle loading animation*/
	let no = 0;
	let pointToFill = 4.72;
	let ch = counter.height;
	let cw = counter.width;
	let diff;
	let done = false;

function fillCounter() {
	setTimeout(()=> {
	    diff = ((no / 100) * Math.PI * 2 * 10);
	    counter.clearRect(0,0,cw,ch);   // Clear canvas every time when function is call
	    counter.strokeStyle = 'red';  // Stroke Color
	    counter.lineWidth = 4;
	    counter.beginPath();
	    counter.arc(40,40,38,pointToFill,diff / 10 + pointToFill); //arc(x,y,radius,start,stop)
	    counter.stroke();   // to fill stroke
	    
	    if(no >= 100) {
	        clearTimeout(fill);
	        done = true; //fill is a variable that call the function fillcounter()
	     }
	     if(done === true){
	     	start();
	     }
	   no++;
   }, 800)
}


let fill = setInterval(fillCounter, 40)

/*Opening animations after play button is pressed*/

function xMove(){
	setTimeout(() =>{
	iconX.style.opacity = 1;
	iconX.style.transform = 'translateY(0%)'; 
	soundGif.style.opacity = 1;
	scroller.style.overflowY = 'scroll';
	started = true;
	}, 2000)

	setTimeout(() =>{	
	sliderPlay.style.backgroundColor = 'white';
	sliderPlay.style.transform = 'translateY(-150%)';
	sliderPlay.style.transition = '1s all';
	}, 1500)
	highlight.style.backgroundColor = 'transparent';
	chevron.style.opacity = 0;
	cover.style.backgroundColor = 'transparent';

	text.style.transform = 'translateY(-300%)';
	mText.style.transform = 'translateY(-180%)';
	mText.style.opacity = 0;
	text.style.opacity = 0;
	canvas.style.opacity = 0;
}

function highlightMove() {
	const xCoord = bottomCircle.getBoundingClientRect();

	const coords = {
		width: xCoord.width,
        height: xCoord.height,
        left: xCoord.left 	
    }

	highlight.style.width = `${coords.width }px`;
	highlight.style.height = `${coords.height}px`;
	highlight.style.top = '90%';
	highlight.style.borderColor = 'white';
	highlight.style.transition = '1s all';
}

function landAnim() {
	setTimeout(() =>{
		highlightMove();
	}, 1500)
	
	xMove();
}

function start(){
	  cover.style.opacity = 0.8;
	  sliderPlay.style.transform = 'translateY(0%)';
	  video.play();
	  play.style.pointerEvents = 'all';
	}

/*Anything to do with the Nav Bar*/
function newNav() {
 if(scroller.scrollTop >= landing.clientHeight + nav.clientHeight * 0.8) {
  nav.classList.add('active-nav');
 } else {
  nav.classList.remove('active-nav');
 }
}

let visible = false;
function openMenu() {
	if(visible === false){
		navMenu.style.opacity = 1;
		navMenu.style.pointerEvents = 'all';
		navMenu.style.cursor = 'pointer';
		visible = true;
	}else{
		navMenu.style.opacity = 0;
		navMenu.style.pointerEvents = 'none';
		navMenu.style.cursor = 'none';
		visible = false;
	}
}

/*for the infoboxes and their fancy animations and entrances*/

function debounce(func, wait = 20, immediate = true) {  /*prevents the function that happens on scroll from firing a lot to preserve performance*/
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

function infoMove() {
	images.forEach(image => {
			if(scroller.scrollTop > image.offsetTop - image.height * 2.5) {
				image.classList.remove('inactive-img');	
			  }})
	title.forEach(title => {
		if(title.offsetParent.offsetTop * 0.6 <= scroller.scrollTop){
			title.classList.remove('inactive-text');
		}
	})
	info.forEach(info => {
		if(info.offsetParent.offsetTop * 0.6 <= scroller.scrollTop){
			info.classList.remove('inactive-text');
		}
	}) 
}

Load();/*Starts all the animation on the webpage*/


/*Event Listeners*/

menu.addEventListener('click', openMenu);

play.addEventListener('click', landAnim);

let isDown = false;
let startY;
let scrollTop;
let started = false;

scroller.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollTop = scroller.scrollTop;
    startY = e.pageY;
    e.preventDefault();
})


scroller.addEventListener('mouseup', () => {
    isDown = false;
})

scroller.addEventListener('mouseleave', () => {
    isDown = false;
})

scroller.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    if(!started) return; //you already know
    e.preventDefault();
    const y = e.pageY;
    const walk = (y - startY) * 2;
   	scroller.scrollTop = scrollTop - walk;
})

scroller.addEventListener('scroll', newNav);
scroller.addEventListener('scroll', infoMove);