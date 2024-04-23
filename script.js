'use strict';
// navbar toggle
const navbar = document.querySelector("[data-navbar]");
const navbarlinks = document.querySelector("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-nav-toggle-btn]");

menuToggleBtn.addEventListener("click", function ()  {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for(let i =0; i < navbarlinks.length; i++) {
    navbarlinks[i].addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggleBtn.classList.toggle("active");
    });
}


// header stciky
const header = document.querySelector("[data-header]");
const BackTopBtn = document.querySelector("[data-back-top-btn]");




window.addEventListener("scroll" , function (){
if(window.scrollY >= 100) {
header.classList.add("active");
BackTopBtn.classList.add("active");

}else{
    header.classList.remove("active");
    BackTopBtn.classList.remove("active");
}
});


// searchbox
const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxEleme = [searchBtn,searchSubmitBtn,searchCloseBtn];
for (let i = 0; i < searchBoxEleme.length; i++) {
    searchBoxEleme[i].addEventListener("click", function () {
        searchContainer.classList.toggle("active");
        document.body.classList.toggle("active");
    })
}

const deliveryBoy = document.querySelector("[data-delivery-boy]");
let deliveryBoyMove = -80;
let lastScrollPos = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener("scroll", function () {
    let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

    if (deliveryBoyTopPos < window.innerHeight && deliveryBoyTopPos > -deliveryBoy.offsetHeight) {
        let currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        if (lastScrollPos < currentScrollPos) {
            deliveryBoyMove +=2; // Increase the movement speed
        } else {
            deliveryBoyMove -=2; // Decrease the movement speed
        }
        lastScrollPos = currentScrollPos;
        deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
    }
});


