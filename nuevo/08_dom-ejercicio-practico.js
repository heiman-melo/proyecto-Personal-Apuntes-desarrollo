// Proyecto personal — funcionalidades y lógica JS con módulos ES6
// Cada sección carga de forma lazy con IntersectionObserver (ver js/section-loader.js)

import { observeSections }    from "./js/section-loader.js";
import hamburgerMenu          from "./js/1_menu-hamburguesa.js";
import { relojDigital }       from "./js/2_reloj-digital.js";
import alarmaDigital          from "./js/3_alarma-digital.js";
import { bolita }             from "./js/4_eventos_del_teclado.js";
import { cuentaRegresiva }    from "./js/5_cuenta_regresiva.js";
import traductor              from "./js/6_traductor.js";
import scrollButton           from "./js/7_scroll_btn_top.js";
import darkaTheme             from "./js/8_color_dark_theme.js";
import responsiveMedia        from "./js/9_objeto_responsive.js";
import responsiveTester       from "./js/10_responsive_tester.js";
import videoCamara            from "./js/11_video_camara.js";
import draw                   from "./js/12_sorteo_aleatorio.js";

const d = document;

// darkaTheme debe ejecutarse antes de DOMContentLoaded para evitar parpadeo de tema
darkaTheme(".dark-theme-btn", "dark-mode");

d.addEventListener("DOMContentLoaded", () => {

  // Panel hamburguesa
  hamburgerMenu(".panel-btn", ".panel", ".menu a");

  // Botón scroll al inicio
  scrollButton();

  // Lazy loading: cada sección carga cuando el usuario se acerca a ella.
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
        d.addEventListener("keydown", (e) => bolita(e));
      }
    },

    {
      id: "seccion3",
      path: "./secciones/3-cuenta-regresiva.html",
      onLoaded: () => cuentaRegresiva("#countdown", "#activarRegresiba")
    },

    {
      id: "seccion4",
      path: "./secciones/4-traductor-de-texto-y-traductor-de-voz.html",
      onLoaded: () => traductor()
    },

    { id: "seccion5", path: "./secciones/5-handlebars.html" },

    { id: "seccion6", path: "./secciones/6-netsuite.html" },

    {
      id: "seccion7",
      path: "./secciones/7-responsive-responsable.html",
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
      id: "seccion8",
      path: "./secciones/8-responsive-tester.html",
      onLoaded: () => responsiveTester("responsive-tester")
    },

    { id: "seccion9", path: "./secciones/9-cosas.html" },

    {
      id: "seccion10",
      path: "./secciones/10-video-de-la-camara.html",
      onLoaded: () => videoCamara("videoCamara")
    },

    {
      id: "seccion11",
      path: "./secciones/11-sorteo-aleatorio.html",
      onLoaded: () => draw("#btn-sorteo", ".player")
    },

  ]);

});
