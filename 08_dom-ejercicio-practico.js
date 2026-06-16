// Proyecto personal de apuntes — JS con módulos ES6
// Cada sección carga de forma lazy con IntersectionObserver (ver js/section-loader.js)

import { observeSections }    from "./js/section-loader.js";
import hamburgerMenu          from "./js/1_menu-hamburguesa.js";
import { relojDigital }       from "./js/2_reloj-digital.js";
import alarmaDigital          from "./js/3_alarma-digital.js";
import { bolita }             from "./js/4_eventos_del_teclado.js";
import { cuentaRegresiva }    from "./js/6_cuenta_regresiva.js";
import traductor              from "./js/7_traductor.js";
import scrollButton           from "./js/8_scroll_btn_top.js";
import darkaTheme             from "./js/9_color_dark_theme.js";
import responsiveMedia        from "./js/10_objeto_responsive.js";
import responsiveTester       from "./js/11_responsive_tester.js";
import videoCamara            from "./js/12_video_camara.js";
import draw                   from "./js/13_sorteo_aleatorio.js";

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

    {
      id: "seccion1",
      path: "./secciones/1-reloj-digital-y-alarma-sonora.html",
      onLoaded: () => {
        relojDigital("#activar-reloj", "#reloj", "#desactivar-reloj");
        alarmaDigital(
          "#activar-alarma", "#alarma", "#desactivar-alarma",
          "#siuuu", "#detenerSiuuu", "#siuuuSonido",
          "#explicaSiuuu", "#detenerExplicaSiuuu", "#explicaSiuuuSonido"
        );
      }
    },

    {
      id: "seccion2",
      path: "./secciones/2-eventos-del-teclado.html",
      onLoaded: () => {
        // El listener se registra en document para capturar teclas en cualquier momento,
        // pero la función bolita() necesita el elemento .ball que vive en esta sección
        d.addEventListener("keydown", (e) => bolita(e));
      }
    },

    {
      id: "seccion3",
      path: "./secciones/3-cuenta-regresiva.html",
      onLoaded: () => cuentaRegresiva("#countdown", "#activarRegresiba")
    },

    { id: "seccion4",  path: "./secciones/4-estilos-usados.html" },
    { id: "seccion5",  path: "./secciones/5-bootstrap-4-6.html" },
    { id: "seccion6",  path: "./secciones/6-git.html" },
    { id: "seccion7",  path: "./secciones/7-hkas.html" },

    {
      id: "seccion8",
      path: "./secciones/8-traductor-de-texto-y-traductor-de-voz.html",
      onLoaded: () => traductor()
    },

    { id: "seccion9",  path: "./secciones/9-react-instalacion-y-manejo-de-la-consola.html" },
    { id: "seccion10", path: "./secciones/10-ux-ui.html" },
    { id: "seccion11", path: "./secciones/11-estilos-material-ui-instalacion.html" },
    { id: "seccion12", path: "./secciones/12-javascript-puro-y-para-react.html" },
    { id: "seccion13", path: "./secciones/13-next-y-react-js-typescript.html" },
    { id: "seccion14", path: "./secciones/14-handlebars.html" },
    { id: "seccion15", path: "./secciones/15-github.html" },
    { id: "seccion16", path: "./secciones/16-netsuite.html" },

    {
      id: "seccion17",
      path: "./secciones/17-responsive-responsable.html",
      onLoaded: () => {
        responsiveMedia(
          "youtube",
          "(min-width:1024px)",
          `<a href="https://youtu.be/5EYW41pfKc4?si=kEyDPCV6060SEPA_" target="_blank" rel="noopener">Ver Video</a>`,
          `<iframe width="560" height="315" src="https://www.youtube.com/embed/5EYW41pfKc4?si=QFJ4uSaFnsxuSVyW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        );
        responsiveMedia(
          "gmaps",
          "(min-width:1024px)",
          `<a href="https://maps.app.goo.gl/iUgRiEpdDcvwN9Eh8" target="_blank" rel="noopener">Ver Mapa</a>`,
          `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.867789200303!2d-72.2099327331432!3d7.782364320996116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e666cf2d7cda179%3A0xf611358382a54573!2sHotel%20Los%20Molinos!5e0!3m2!1ses-419!2sco!4v1713027737319!5m2!1ses-419!2sco" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        );
      }
    },

    {
      id: "seccion18",
      path: "./secciones/18-responsive-tester.html",
      onLoaded: () => responsiveTester("responsive-tester")
    },

    { id: "seccion19", path: "./secciones/19-cosas.html" },
    { id: "seccion20", path: "./secciones/20-resumen-de-videos.html" },

    {
      id: "seccion21",
      path: "./secciones/21-video-de-la-camara.html",
      onLoaded: () => videoCamara("videoCamara")
    },

    {
      id: "seccion22",
      path: "./secciones/22-sorteo-aleatorio.html",
      onLoaded: () => draw("#btn-sorteo", ".player")
    },

    { id: "seccion23", path: "./secciones/23-atajos-teclado.html" },
    { id: "seccion24", path: "./secciones/24-front-back.html" },
    { id: "seccion25", path: "./secciones/25-extensiones-chrome.html" },

  ]);

});
