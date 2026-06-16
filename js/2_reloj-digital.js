export function relojDigital(activarReloj,reloj,desactivarReloj){
  const d = document;
    let clockTempo;
    d.addEventListener("click", (e) => {
      if (e.target.matches(activarReloj)) {
        clockTempo = setInterval(() => { // este arranca de una 
          let clockHour = new Date().toLocaleTimeString(); // para que salga en un formato humano
          d.querySelector(reloj).innerHTML = `<h3>${clockHour}</h3>`;
        }, 1000);
        d.querySelector(activarReloj).disabled = true;
      }
      if (e.target.matches(desactivarReloj)) {
        clearInterval(clockTempo); // los dos se pueden detener
        d.querySelector(reloj).innerHTML = "";
        d.querySelector(activarReloj).disabled = false;
      }
    });
}
