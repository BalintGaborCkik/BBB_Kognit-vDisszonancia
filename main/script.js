const hamburgerGomb = document.querySelector('input[type="button"]');
hamburgerGomb.addEventListener("click",showHamburgerMenu);

function showHamburgerMenu() {
    const menu = document.querySelector("#menu");
    const hamburgerMenu = document.querySelector("nav");
    if(hamburgerMenu.style.display ==="none" || hamburgerMenu.style.display ===""){
        hamburgerMenu.style.display = "block";
        menu.style.gridTemplateColumns = "1fr 9fr";
    }else{
        hamburgerMenu.style.display = "none";
        menu.style.gridTemplateColumns = "1fr";
    }
}

function updateTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ido = document.querySelector("#ido");
    ido.textContent = `${hours}:${minutes}`;
}
updateTime();
setInterval(updateTime,300);