export default function hamburgerMenu(panelBtn, panel , menuLink){
  const d = document;
  d.addEventListener("click", (e) => {
    //* con el asterisco cualquier elemento que dentro del selector antes del asterisco
    if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
      d.querySelector(panel).classList.toggle("is-active");
      d.querySelector(panelBtn).classList.toggle("is-active");
    }
    if (e.target.matches(menuLink)) {
      // document.querySelector(".panel").classList.remove("is-active");
      // document.querySelector(".panel-btn").classList.remove("is-active");
      d.querySelector(panel).classList.toggle("is-active");
      d.querySelector(panelBtn).classList.toggle("is-active");
    }
  });
}