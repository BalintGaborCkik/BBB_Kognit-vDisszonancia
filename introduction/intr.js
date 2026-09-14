const kepek = [
            "../Images/kep1.jpg",
            "../Images/kep2.jpg",
            "../Images/kep3.jpg"
        ];
let kepIndex = 0;
let megnyitva = false;

function kovetkezoKep() {

    if (megnyitva == false) {

        document.getElementById("kepnezegeto").style.display = "block";

        document.getElementById("bezaras").style.display = "block"; 

        document.getElementById("kep").src = kepek[kepIndex];

        document.getElementById("gomb").value = "Következő kép";

        megnyitva = true;

        } else {

            kepIndex++;

            if (kepIndex >= kepek.length) {
                kepIndex = 0;
            }

            document.getElementById("kep").src = kepek[kepIndex];
            }
        }
function bezar() {
    document.getElementById("kepnezegeto").style.display = "none";

    document.getElementById("bezaras").style.display = "none"; 

    document.getElementById("gomb").value = "Kép megnyitása"; 

    kepIndex = 0; 
    megnyitva = false; }