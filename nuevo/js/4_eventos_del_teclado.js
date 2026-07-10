export function shortcuts(e){
let algo =  e.key
let algo2 = e.keyCode
let algo3 = e.type
let algo4 = e.altKey

debugger
    //   e.type     // tipo de evento
    //   e.key      // letra tecleada
    //   e.keyCode  // numero que coresponde a la tecla
    //   e.which    // parecido al keyCode
    //   console.log(e);
    //   e.ctrlKey  // true o false si la tecla ctrl fue tecleada o no 
    //   e.altKey   // true o false
    //   e.shiftKey // true o false
};
let x = 0;
let y = 0;
export function bolita (e){
    let d = document;
      const $ball = d.querySelector(".ball"),
        $stage = d.querySelector(".stage"),
        limitsBall = $ball.getBoundingClientRect(), // aqui estamos obteniendo el valor en que esta posicionado el elemento 
        limitsStage = $stage.getBoundingClientRect(); // aqui esta el tamaño y posicion de la caja

      switch (e.keyCode) {
        case 37:
          //("left")
          if (limitsBall.left > limitsStage.left) {
            e.preventDefault(); // este es porque hay un scrooll entonces no solo se movera la bola sino el escrooll tambien y con esto solo la bola 
            x--
          };
          break;
        case 38:
          //("up")
          if (limitsBall.top > limitsStage.top) {
            e.preventDefault();
            y--;
          }
          break;
        case 39:
          //("rigth");
          if (limitsBall.right < limitsStage.right) {
            e.preventDefault();
            x++;
          }
          break;
        case 40:
          //("down");
          if (limitsBall.bottom < limitsStage.bottom) {
            e.preventDefault();
            y++;
          }
        // default: // si no se ejecuta ninguna de kas sentencias que se ejecute lo que yo coloque en default
        //   break;
      }
      $ball.style.transform = `translate(${x * 10}px, ${y * 10}px)`; // una propiedad css que me traslada de position un elemeto
  
}

