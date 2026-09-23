const datum = document.querySelector("#datum");
const menny = document.querySelector("#menny");
const ar = document.querySelector("#ar");
const ora = document.querySelector("#ora");

const rogzites = document.querySelector("#rogzites form input[type='submit']");

rogzites.addEventListener('click',feldolgozas);

const kereses = document.querySelector("#kereses form>input")
kereses.addEventListener("click",datumKereses)

const tankolasokLista = JSON.parse(localStorage.getItem("tankolasok"))||[];

function feldolgozas(e) {
    if(datum.value != '' && menny.value != '' && ar.value != '' && ora.value != ''){
        e.preventDefault()
        const tank = {
            year: parseInt(datum.value.split('-')[0]),
            month: parseInt(datum.value.split('-')[1]),
            day: parseInt(datum.value.split('-')[2]),
            amount: parseInt(menny.value),
            price: parseInt(ar.value),
            odo: parseInt(ora.value)
        }
        tankolasokLista.push(tank);
        datum.value = null;
        menny.value = null;
        ar.value = null;
        ora.value = null;
        localStorage.setItem("tankolasok",JSON.stringify(tankolasokLista))
        console.log("Sikeres rögzítés");
        szamolasHonap();
        hatekonysagSzamolas();
        datumKereses(e);
    }
}

function szamolasHonap() {
    const spans = document.querySelectorAll("ul li span");
    for (let i = 0; i<spans.length;i++) {
        let sum = 0;
        for (const tank of tankolasokLista) {
            if(tank.month===i+1){
                sum+= tank.price
            }
        }
        spans[i].innerText =`${sum} Ft`
    }
}

function hatekonysagSzamolas() {
    const ol = document.querySelector("#hatekonysag ol");
    if(!ol) return;
    ol.innerHTML = "";

    const rendezett = [...tankolasokLista].sort((a,b)=>{
        const aRendezoSzam = a.year*10000 + a.month*100 + a.day;
        const bRendezoSzam = b.year*10000 + b.month*100 + b.day;
        return aRendezoSzam - bRendezoSzam;
    });

    const szakaszok = [];
    for(let i = 1; i<rendezett.length; i++){
        const elozo = rendezett[i-1];
        const aktualis = rendezett[i];
        const km = aktualis.odo - elozo.odo;
        const fogyasztott = aktualis.amount;
        if(km > 0){
            szakaszok.push({
                elozo,
                aktualis,
                km,
                fogyasztott,
                atlagFogyasztas: fogyasztott / km * 100
            });
        }
    }

    szakaszok.sort((a,b)=>a.atlagFogyasztas - b.atlagFogyasztas);

    for(const sz of szakaszok){
        const li = document.createElement("li");
        li.innerText = `${sz.elozo.year}.${sz.elozo.month}.${sz.elozo.day}. → ${sz.aktualis.year}.${sz.aktualis.month}.${sz.aktualis.day}.: ${sz.km} km, ${sz.fogyasztott} l, ${sz.atlagFogyasztas.toFixed(2)} l/100km`;
        ol.append(li);
    }
}

function datumKereses(e) {
    const vars = document.querySelectorAll("#kereses form label input")
    if(vars[0].value!='' && vars[1].value !=''){
        e.preventDefault()
        const min = {}
        min.year = parseInt(vars[0].value.split('-')[0])
        min.month = parseInt(vars[0].value.split('-')[1])
        min.day = parseInt(vars[0].value.split('-')[2])

        const max = {}
        max.year = parseInt(vars[1].value.split('-')[0])
        max.month = parseInt(vars[1].value.split('-')[1])
        max.day = parseInt(vars[1].value.split('-')[2])

        const iframe = document.querySelector("#kereses iframe")
        if(iframe){
            iframe.parentElement.removeChild(iframe);
        }
        const kParameter = {}
        kParameter.min = min;
        kParameter.max = max;
        localStorage.setItem("kereses",JSON.stringify(kParameter));
        
        const newIFrame = document.createElement("iframe")
        newIFrame.src = "kereses.html"
        const resz = document.getElementById("kereses");
        resz.append(newIFrame);
    }
}
szamolasHonap()
hatekonysagSzamolas()