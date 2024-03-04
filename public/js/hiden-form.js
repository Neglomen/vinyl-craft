const sidebarMenu = document.getElementById("sidebar-menu");
const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("overlay");
const mobileNav = document.getElementById("mobile-nav");

function toggleMenu() {
  mobileNav.style.transform = "translateY(-100%)";
  sidebarMenu.style.transform = "translateX(0%)";
  overlay.style.visibility = "visible";
  overlay.style.opacity = "0.7";
}

function hideMenu(event) {
  if (event.target !== sidebarMenu) {
    sidebarMenu.style.transform = "translateX(-100%)";
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    mobileNav.style.transform = "translateY(0%)";
  }
}
let text = document.querySelectorAll('.text *');
function showText(text){

  text.forEach((p,i)=>{
    setTimeout(()=>{
   
      p.style.opacity =1
    },(i)*1500)
  })


}


window.addEventListener("DOMContentLoaded", function(){

  showText(text)
 });

document.body.addEventListener("click", function (event) {
  hideMenu(event);
});

sidebarMenu.addEventListener("click", function (event) {
  event.stopPropagation();
});
hamburger.addEventListener("click", function (event) {
  event.stopPropagation();
});
