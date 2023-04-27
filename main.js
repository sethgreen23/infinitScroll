const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");

// max number of cards to be added
const cardLimit = 99;
cardTotalElem.innterHTML = cardLimit;

// card to increase page by
const cardIncrease = 9;
// page count
const pageCount = Math.ceil(cardLimit / cardIncrease);
//current page
let currentPage = 1;
/*
 * Functions
 * */
const getRandomColor = ()=>{
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}deg, 90%, 85%)`;
}
// create card
const createCard = (index)=>{
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = index;
  card.style.backgroundColor = getRandomColor();
  cardContainer.appendChild(card);
}

// add cards functon
const addCards = (pageIndex)=>{
  currentPage = pageIndex;
  
  const startRange = (pageIndex-1) * cardIncrease;
  const endRange = currentPage == pageCount?cardLimit:pageIndex * cardIncrease;
  
  cardCountElem.innerHTML = endRange;
  for(let i=startRange+1; i<=endRange; i++){
    createCard(i);
  }
 
}

 
  // loading initial cards
  window.onload = function(){
    addCards(currentPage);
  }

// handle infinit scroll

const handleInfiniteScroll = ()=>{
  // throtal controll the display
  throttle(()=>{
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    
    if(endOfPage){
      addCards(currentPage + 1);
    }
    if(currentPage == pageCount){
      removeInfiniteScroll();
    }
  }, 1000)
}

// add scrool event handler
window.addEventListener("scroll", handleInfiniteScroll);

// make a throtal function to controll the scrolling
var throttleTimer;

const throttle = (callback, time)=>{
  if(throttleTimer) return;
  throttleTimer = true;
  setTimeout(()=>{
    callback();
    throttleTimer = false;
  }, time)
}

// remove infinite scroll
const removeInfiniteScroll =()=>{
  loader.remove();
  window.removeEventListener("scroll", handleInfiniteScroll);
}