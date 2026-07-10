
const scrollButton = function (e) {
  let w = window;
  let d = document;
  const $scrollTop = d.querySelector(".scroll-top-btn");
  w.addEventListener("scroll",()=>{
    // debugger
    let scroll = w.pageYOffset || d.documentElement.scrollTop;
    if(scroll > 800 ){
    $scrollTop.classList.remove("hidden");
    }else{
      $scrollTop.classList.add("hidden");
    }
  });
  d.addEventListener("click", (e)=>{
    if(e.target.matches(".scroll-top-btn")){
      //scrollTo es un objeto de javaScript al cual se le pueden pasar diferentes opciones
      w.scrollTo({
        behavior: "smooth", // esta es como la forma en como hace la transicion
        top:0
      })
    }
  })
}
export default scrollButton;