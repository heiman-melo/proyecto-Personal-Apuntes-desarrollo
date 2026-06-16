export function cuentaRegresiva (countdown,activarRegresiba){
  // let limitDate = "jun 03,2023 03:23:19"
  // let limitDate = "jan 28,2023 24:00:00";
  let limitDate ="March 07, 2024 17:22:00";
  // let finalMessage = "Feliz cumpleaños heiman castro";
  let finalMessage = "6 de la tarde siuuuu";
  let d = document;
  const $countdown = d.querySelector(countdown);
  let coundownDate = new Date(limitDate).getTime();// que pasa al pasarle la fecha
  let limiteFinal= coundownDate;
  let countdownTempo;
  d.addEventListener('click', (e) => {
    if (e.target.matches(activarRegresiba)) {
      d.querySelector(activarRegresiba).disabled = true;
        countdownTempo = setInterval(()=>{ // esta se ejecutara de una con un intervalo de tiempo especificado al final de la funcion la unica manera de detenerla es clearInterval()
        let now = new Date().getTime();
        let limitTime = coundownDate-now; // tiempo en milisegundos va disminuyendo a medida que la hora actual aumenta
        // console.log(limitTime)
        let days = ("0" + Math.floor(limitTime/(1000*60*60*24)))// Math.floor(6.999)=6 redondea al numero mas cercano hacia abajo , (milisegundos*minutos*segundos*horas)
        let hours = ("0" + Math.floor((limitTime % (1000*60*60*24))/(1000*60*60)));
        let minutes = ("0" + Math.floor((limitTime % (1000*60*60))/(1000*60))).slice(-2);
        let seconds = ("0" + Math.floor((limitTime % (1000*60))/1000)).slice(-2); 
        // let dia;
        // if(days === 1){
        //   dia = "dia"
        // }else{
        //   dia = "dias"
        // }
      
        let dias = days === "01" ? "dia" : "dias"; // operador ternario
        let horas = hours === "01" ? "hora" : "horas";
        let minutos = minutes === "01" ? "minuto" : "minutos";
        let segundos = seconds === "01" ? "segundo" : "segundos";
      
        $countdown.innerHTML = `<h3>Faltan:${days} ${dias} ${hours} ${horas} ${minutes} ${minutos} ${seconds} ${segundos}</h3>`;
        // console.log(Math.floor((limitTime % (1000*60*60*24))));
        if(limitTime <0 && limiteFinal < now){
          clearInterval(countdownTempo);
          $countdown.innerHTML = `<h3>${finalMessage}</h3>`;
          d.querySelector("#siuuuSonido").play();
          // este fue un serTimeout para detener el sonido en el tiempo que yo desee
          // setTimeout(() => { // este arranca en el tiempo que se le coloco
          //   d.querySelector("#siuuuSonido").pause(); // para pausar la alarma
          //   d.querySelector("#siuuuSonido").currentTime = 0; // para reiniciar la alarma al comienzo
          // }, 8000);
        }
        // console.log((limitTime/(1000*60*60*24))); 
        },1000);
    }
    if(e.target.matches("#desactivarRegresiba")){
        clearInterval(countdownTempo);
        $countdown.innerHTML="";
        d.querySelector(activarRegresiba).disabled = false;
        d.querySelector("#siuuuSonido").pause(); // para pausar la alarma
        d.querySelector("#siuuuSonido").currentTime = 0; // para reiniciar la alarma al comienzo
    }
  })
  

}