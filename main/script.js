/* Gábor kódja */
function updateTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ido = document.querySelector("#fehercucc");
    const hoursString = hours<10 ? `0${hours}` : hours;
    const minutesString = minutes<10 ? `0${minutes}` : minutes;
    console.log(hours);
    
    ido.textContent = `${hoursString}:${minutesString}`;
}
updateTime();
setInterval(updateTime,300);