const d= document;
const w=window;

export default function responsiveMedia(id,mq,mobileContent,desktopContent){
   let breakpoint = w.matchMedia(mq) // es un metodo que siempre se va a estar ejecutando cuando se agrande o se vuelva pequeña la ventana del navegador
   const responsive = (e) => {
    console.log(breakpoint)
    
    if(e.matches) { // esto lo trae el objeto matchMedia sera true si coninside con lo que le estoy pasando (mq) q= es la forma como se pasa ese valor 
        d.getElementById(id).innerHTML = desktopContent;
    }else{
        d.getElementById(id).innerHTML = mobileContent;
    }
   }
//    breakpoint.addListener(responsive);
   breakpoint.addEventListener("change", responsive) // cada vez que se mueva la ventana me ejecutara este evento onchange 
   responsive(breakpoint);
}

// resumen
// en este ejercicio podemos ver que al guardar en tamaño movil se guardan menos cosas con un peso muchisimo menor osea que esto las 
// media queris si es muy importante a la hora de ahorrarle datos al usuario