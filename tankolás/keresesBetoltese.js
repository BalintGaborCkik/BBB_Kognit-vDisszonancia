const tankolasok = JSON.parse(localStorage.getItem("tankolasok"))||[];
const keresesValue = JSON.parse(localStorage.getItem("kereses"));

const monthTable =[31,28,31,30,31,30,31,31,30,31,30,31]

function getSum(cap) {
    let s = 0;
    for(let i = 0;i<cap;i++){
        s+=monthTable[i];
    }
    return s;
}
function kozteVan(akt,min,max) {
    const aktDay = akt.year*365+(akt.year-(akt.year%4))/4+getSum(akt.month)+akt.day
    const minDay = min.year*365+(min.year-(min.year%4))/4+getSum(min.month)+min.day
    const maxDay = max.year*365+(max.year-(max.year%4))/4+getSum(max.month)+max.day
    return aktDay>=minDay && aktDay<=maxDay;
}
for (const tank of tankolasok) {
    if(kozteVan(tank,keresesValue.min,keresesValue.max)){
        const p = document.createElement("p")
        p.innerText = `ˇ${tank.year}.${tank.month}.${tank.day}.: ${tank.amount} liter ${tank.price} Ft`
        document.body.append(p);
    }
}