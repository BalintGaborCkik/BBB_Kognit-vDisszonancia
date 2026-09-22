const datum = document.querySelector("#datum");
const menny = document.querySelector("#menny");
const ar = document.querySelector("#ar");

const rogzites = document.querySelector("form input[type='submit']");

rogzites.addEventListener('click',feldolgozas);

const tankolasok = document.getElementById("tankolasok")
function feldolgozas(e) {
    e.preventDefault()
    console.log(datum.value);
    console.log(menny.value);
    console.log(ar.value);
   
    const li = document.createElement("li")
    li.innerText = `${datum.value}: ${menny.value} liter, ${ar.value} Ft `
    tankolasok.append(li);

    datum.value = null;
    menny.value = null;
    ar.value = null;
    console.log("Sikeres rögzítés");
}