export default function alarmaDigital(activarAlarma,alarma,desactivarAlarma,siuuu,detenerSiuuu,siuuuSonido,explicaSiuuu,detenerExplicaSiuuu,explicaSiuuuSonido){
  const d = document;
  let alarmaTempo;
  let siuuuTempo;
  let explicaSiuuuTempo;
  d.addEventListener('click', (e) => {
    //---------------------------------alarma---------------------------------------
    if (e.target.matches(activarAlarma)) {
      alarmaTempo = setTimeout(() => { // este arranca en el tiempo que se le coloco y se ejecutara una sola vez es bueno limpiarla tambien para hacer cualquier loguica y no quede inicializado algun tiempo
        d.querySelector(alarma).play();
      }, 1000);

      d.querySelector(activarAlarma).disabled = true;
    }
    if (e.target.matches(desactivarAlarma)) {
      clearTimeout(alarmaTempo); // los dos se pueden detener // es bueno limpiar el temporizador4 para no desactivar el sonido y que el temporizador no alla terminado
      d.querySelector(alarma).pause(); // para pausar la alarma
      d.querySelector(alarma).currentTime = 0; // para reiniciar la alarma al comienzo
      d.querySelector(activarAlarma).disabled = false;
    }
    d.querySelector(alarma).addEventListener('ended', function(e) {
      d.querySelector(activarAlarma).disabled = false;
    });
    // ------------------------------siuuu------------------------------------------
    if (e.target.matches(siuuu)) {
        d.querySelector(siuuuSonido).play();
        d.querySelector(siuuu).disabled = true;
    }
    if (e.target.matches(detenerSiuuu)) {
      d.querySelector(siuuuSonido).pause(); // para pausar la alarma
      d.querySelector(siuuuSonido).currentTime = 0; // para reiniciar la alarma al comienzo
      d.querySelector(siuuu).disabled = false;
    }
    d.querySelector(siuuuSonido).addEventListener('ended', function() {
      d.querySelector(siuuu).disabled = false;
      // Puedes realizar otras acciones después de que el audio haya terminado
    });
     // ---------------------explicaSiuuu---------------------------------------------
    if (e.target.matches(explicaSiuuu)) {
      explicaSiuuuTempo = setTimeout(() => { // este arranca en el tiempo que se le coloco
        d.querySelector(explicaSiuuuSonido).play();
      }, 1000);

      d.querySelector(explicaSiuuu).disabled = true;
    }
    if (e.target.matches(detenerExplicaSiuuu)) {
      clearTimeout(explicaSiuuuTempo); // los dos se pueden detener
      d.querySelector(explicaSiuuuSonido).pause(); // para pausar la alarma
      d.querySelector(explicaSiuuuSonido).currentTime = 0; // para reiniciar la alarma al comienzo
      d.querySelector(explicaSiuuu).disabled = false;
    }
    d.querySelector(explicaSiuuuSonido).addEventListener('ended', function(e) {
      d.querySelector(explicaSiuuu).disabled = false;
    });
    d.querySelector(explicaSiuuuSonido).addEventListener('error', function(e) {
      alert('ocurrio un error');
    });
  });
};