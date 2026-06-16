let d = document;
const darkaTheme = function (buttonTehem,classTheme) {
  const $darkTheme = d.querySelector(buttonTehem);
  let luna = "🌚";
  let sol = "☀️";
  const $dataTheme = d.querySelectorAll("*[data-darkTheme]");
  function moon () {
    $dataTheme.forEach((el)=>el.classList.add(classTheme));
    $darkTheme.textContent = sol;
    localStorage.setItem("theme","luna")
;  };

  function  ligthTheme () {
    $dataTheme.forEach((el)=>el.classList.remove(classTheme));
    $darkTheme.textContent = luna;
    localStorage.setItem("theme","sol")

  }
  d.addEventListener("click",(e)=>{
    // debugger
    if(e.target.matches(buttonTehem)){
      if(e.target.textContent === luna){
        moon ();
      }else{
        ligthTheme();
      }}
  });
  d.addEventListener("DOMContentLoaded", () => {
    // debugger
    if(localStorage.getItem("theme")===null) localStorage.setItem("theme","sol")
    if(localStorage.getItem("theme")==="luna") moon();
    if(localStorage.getItem("theme")==="sol") ligthTheme();
  });
}

export default darkaTheme;