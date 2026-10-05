let gyumolcsok = [" ", "🍎", "🍌", "🍓", "🍊", "🍇"]
let palyaadat = []
let palyameret = 7

let energia = 100
let pontszam = 0
let jatekFut = true

let inventory = {
    "🍎": 0,
    "🍌": 0,
    "🍓": 0,
    "🍊": 0,
    "🍇": 0
}

function tablaGeneral(x) {
    let tabla = document.createElement("table")
    tabla.id = "palya"

    for (let i = 0; i < x; i++) {
        let sor = document.createElement("tr")

        for (let j = 0; j < x; j++) {
            let cella = document.createElement("td")
            cella.textContent = " "
            sor.appendChild(cella)
        }

        tabla.appendChild(sor)
    }

    document.body.appendChild(tabla)
}

function randomgyum(x) {
    let random = Math.random() * 100

    if (random > x) {
        return 0
    }

    let n = gyumolcsok.length - 1
    let osszes = 0

    for (let i = 1; i <= n; i++) {
        osszes += n - i + 1
    }

    let r = Math.random() * osszes

    for (let i = 1; i <= n; i++) {
        r -= n - i + 1

        if (r < 0) {
            return i
        }
    }
}

function randomfeltolt() {
    for (let i = 0; i < palyameret * palyameret; i++) {
        palyaadat[i] = gyumolcsok[randomgyum(15)]
    }

    palyaadat[Math.floor(palyameret * palyameret / 2)] = "X"
}

function cellamuvelet(x, y, a) {
    // console.log(x);
    // console.log(y);
    // console.log(typeof(a));
    
    
    
    document.querySelector(`#palya tr:nth-child(${x}) td:nth-child(${y})`).textContent = a
}

function palyafrisit(a) {
    for (let i = 0; i < palyameret * palyameret; i++) {
        cellamuvelet(
            Math.floor(i / palyameret) + 1,
            (i % palyameret) + 1,
            a[i]
        )
    }
}

function kattintasok() {
    let cellak = document.querySelectorAll("#palya td")

    for (let i = 0; i < cellak.length; i++) {

        cellak[i].addEventListener("click", function() {

            if (!jatekFut || energia <= 0) {
                return
            }

            let index = i

            let xIndex = palyaadat.indexOf("X")

            let xSor = Math.floor(xIndex / palyameret)
            let xOszlop = xIndex % palyameret

            let ujSor = Math.floor(index / palyameret)
            let ujOszlop = index % palyameret

            let tavolsag =
                Math.abs(xSor - ujSor) +
                Math.abs(xOszlop - ujOszlop)

            
            if (tavolsag === 1) {
                
                let gyumolcs = palyaadat[index]

                    if (gyumolcs !== " " && gyumolcs !== "X") {
                        inventory[gyumolcs]++
                    if (gyumolcs==="🍎") {

                        pontszam += 5
                    }
                    else if (gyumolcs==="🍌") {

                        pontszam += 10
                    }
                    else if (gyumolcs==="🍓") {

                        pontszam += 25
                    }
                    else if (gyumolcs==="🍊") {

                        pontszam += 50
                    }
                    else if (gyumolcs==="🍇") {

                        pontszam += 100
                    }
                    pontszam += 1
                    
                }

                palyaadat[xIndex] = " "
                palyaadat[index] = "X"

                energia-=10;
                // console.log(palyaadat);
                
                let gyum = gyumolcsok[randomgyum(20)]
                let ujHely = Math.floor(Math.random() * palyameret * palyameret)

                if (gyum !== " " && palyaadat[ujHely] === " ") {
                    palyaadat[ujHely] = gyum
                }
                
                frissitAdatokat()
                palyafrisit(palyaadat)

                if (energia <= 0) {
                    jatekVege()
                }
            }
        })
    }
}

function frissitAdatokat() {
    document.querySelector("#energia").textContent = energia
    document.querySelector("#pontszam").textContent = pontszam

    document.querySelector("#almaDb").textContent = inventory["🍎"]
    document.querySelector("#bananDb").textContent = inventory["🍌"]
    document.querySelector("#eperDb").textContent = inventory["🍓"]
    document.querySelector("#narancsDb").textContent = inventory["🍊"]
    document.querySelector("#szoloDb").textContent = inventory["🍇"]
}

function gyumolcsMegesz(gyumolcs) {

    if (!jatekFut) {
        return
    }

    if (inventory[gyumolcs] <= 0) {
        return
    }

    inventory[gyumolcs]--
    if (gyumolcs==="🍎") {
        energia += 10
        pontszam -= 5
    }
    else if (gyumolcs==="🍌") {
        energia += 20
        pontszam -= 10
    }
    else if (gyumolcs==="🍓") {
        energia += 50
        pontszam -= 25
    }
    else if (gyumolcs==="🍊") {
        energia += 100
        pontszam -= 50
    }
    else if (gyumolcs==="🍇") {
        energia += 200
        pontszam -= 100
    }
  

    if (pontszam < 0) {
        pontszam = 0
    }

    frissitAdatokat()
}

function jatekVege() {

    jatekFut = false

    document.querySelector("#jatekVege").textContent =
        "Játék vége! Végleges pontszám: " + pontszam

    let cellak = document.querySelectorAll("#palya td")

    for (let i = 0; i < cellak.length; i++) {
        cellak[i].style.pointerEvents = "none"
    }
}

document.querySelector("#alma").addEventListener("click", function() {
    gyumolcsMegesz("🍎")
})

document.querySelector("#banan").addEventListener("click", function() {
    gyumolcsMegesz("🍌")
})

document.querySelector("#eper").addEventListener("click", function() {
    gyumolcsMegesz("🍓")
})

document.querySelector("#narancs").addEventListener("click", function() {
    gyumolcsMegesz("🍊")
})

document.querySelector("#szolo").addEventListener("click", function() {
    gyumolcsMegesz("🍇")
})

document.querySelector("#vege").addEventListener("click", function() {
    jatekVege()
})


// JÁTÉK INDÍTÁSA

tablaGeneral(palyameret)
randomfeltolt()
palyafrisit(palyaadat)
kattintasok()
frissitAdatokat()