// Proyecto personal de apuntes — JS con módulos ES6
// Cada sección carga de forma lazy con IntersectionObserver (ver js/section-loader.js)

import { observeSections }    from "./js/section-loader.js";
import hamburgerMenu          from "./js/1_menu-hamburguesa.js";
import scrollButton           from "./js/8_scroll_btn_top.js";
import darkaTheme             from "./js/9_color_dark_theme.js";
import responsiveMedia        from "./js/10_objeto_responsive.js";
import responsiveTester       from "./js/11_responsive_tester.js";
import videoCamara            from "./js/12_video_camara.js";

const d = document;

// darkaTheme debe ejecutarse antes de DOMContentLoaded para evitar parpadeo de tema
// El módulo ES6 es diferido (deferred), el DOM ya está parseado cuando llega aquí
darkaTheme(".dark-theme-btn", "dark-mode");

d.addEventListener("DOMContentLoaded", () => {

  // Panel hamburguesa
  hamburgerMenu(".panel-btn", ".panel", ".menu a");

  // Botón scroll al inicio (el botón está en el HTML principal, no en una sección)
  scrollButton();

  // Lazy loading: cada sección carga cuando el usuario se acerca a ella.
  // El campo onLoaded ejecuta la función del widget DESPUÉS de que el HTML de la sección
  // está en el DOM. Sin esto, los querySelector dentro de cada módulo no encontrarían nada.
  observeSections([
    { id: "seccion1",  path: "./secciones/1-estilos-usados.html" },
    { id: "seccion2",  path: "./secciones/2-bootstrap-4-6.html" },
    { id: "seccion3",  path: "./secciones/3-git.html" },
    { id: "seccion4",  path: "./secciones/4-hkas.html" },
    { id: "seccion5",  path: "./secciones/5-react-instalacion-y-manejo-de-la-consola.html" },
    { id: "seccion6",  path: "./secciones/6-ux-ui.html" },
    { id: "seccion7",  path: "./secciones/7-estilos-material-ui-instalacion.html" },
    { id: "seccion8",  path: "./secciones/8-javascript-puro-y-para-react.html" },
    { id: "seccion9",  path: "./secciones/9-next-y-react-js-typescript.html" },
    { id: "seccion10", path: "./secciones/10-github.html" },
    { id: "seccion11", path: "./secciones/11-resumen-de-videos.html" },
    { id: "seccion12", path: "./secciones/12-atajos-teclado.html" },
    { id: "seccion13", path: "./secciones/13-front-back.html" },
    { id: "seccion14", path: "./secciones/14-extensiones-chrome.html" },
  ]);

});
