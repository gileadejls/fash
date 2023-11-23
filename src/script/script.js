const menu = document.querySelector("#menu")
const close = document.querySelector("#close")
const mobileItems = document.querySelector(".menu-mobile-items")



menu.addEventListener("click", ()=>{
    mobileItems.style = "transform: translateX(0);"
})

close.addEventListener("click", ()=>{
    mobileItems.style = "display: hidden;"
})