const hamburgerGomb = document.querySelector('input[type="button"]');
hamburgerGomb.addEventListener("click",showHamburgerMenu);

function showHamburgerMenu() {
    const menu = document.querySelector("main");
    const hamburgerMenu = document.querySelector("nav");
    if(hamburgerMenu.style.display ==="none" || hamburgerMenu.style.display ===""){
        hamburgerMenu.style.display = "block";
        menu.style.gridTemplateColumns = "1fr 9fr";
    }else{
        hamburgerMenu.style.display = "none";
        menu.style.gridTemplateColumns = "1fr";
    }
}