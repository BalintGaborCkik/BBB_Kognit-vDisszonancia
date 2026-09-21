const gomb = document.querySelector("#fuvesgomb");

let i = parseInt(localStorage.getItem("szin") || 0);
const szinek =[
    "piros",
    "zold",
    "kek"
];
gomb.classList = "";
gomb.value = szinek[i];
gomb.classList.add(szinek[i]);

gomb.addEventListener("click",zoldHatter);
function zoldHatter() {
    i=(i+1)%3;
    gomb.classList = "";
    gomb.value = szinek[i];
    gomb.classList.add(szinek[i]);
    localStorage.setItem("szin",i);
};

const tankolas = {
    date: 2000,
    amount: 20,
    price:  14000 
};
console.log(JSON.stringify(tankolas));
