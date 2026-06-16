# Mis Proyectos y Teoría — Apuntes Personales

## ¿Qué es este proyecto?

Sitio web estático de apuntes personales creado durante un curso de programación.
Funciona como cuaderno digital donde se guardan conocimientos, ejercicios y referencias
de temas como JavaScript, Git, Bootstrap, React, NetSuite, y más.

Está pensado para uso local con Live Server en VS Code. Las secciones se cargan de forma lazy
(solo cuando el usuario llega a ellas), lo que hace que la página abra rápido sin importar
cuántas secciones haya.

---

## Stack Tecnológico

- **HTML5** — estructura de la página (`08_dom-ejercicio-practico.html`)
- **CSS3** — estilos con variables CSS (`:root`), importa `css/1_menu-hamburguesa.css`
- **JavaScript ES Modules** (Vanilla, sin frameworks, sin npm, sin bundler)
- **CDN externos**: Hamburgers CSS (jonsuh.com), Font Awesome (kit personal)
- **Requiere servidor local o GitHub Pages** para funcionar (usa `fetch()` para cargar secciones — no abre con `file://`)

---

## Estructura de Archivos

```
/
├── 08_dom-ejercicio-practico.html   ← Shell principal de la app (único HTML raíz)
├── 08_dom-ejercicio-practico.js     ← Entry point JS (type="module")
├── 08_dom-ejercicio-practico.css    ← Hoja de estilos principal
├── favicon-32x32.png                ← Ícono de la pestaña del navegador
├── README.md                        ← Este archivo
├── .gitignore                       ← Archivos excluidos del repositorio
├── assets/
│   ├── alarma.mp3                   ← Sonido de la alarma digital
│   ├── CR7 Muchas gracias aficion. SIUUUU.mp3  ← Audio del festejo de CR7
│   ├── Cristiano Ronaldo explica.mp3            ← Audio de CR7 explicando
│   └── Gallo despertador.mp3        ← Sonido alternativo de alarma
├── css/
│   ├── 1_menu-hamburguesa.css       ← Panel lateral animado (slide from top)
│   └── traductor_google.css         ← Estilos específicos del traductor (sección 8)
├── img/
│   ├── archivo.png                  ← Capturas de pantalla para las secciones de teoría
│   ├── archivo_2.png
│   ├── archivo_3.png
│   ├── archivo_4.png
│   └── que_debo_descargar.png
├── js/
│   ├── section-loader.js            ← Lazy loading con IntersectionObserver
│   ├── 1_menu-hamburguesa.js        ← Lógica del panel hamburguesa
│   ├── 2_reloj-digital.js           ← Reloj digital en tiempo real
│   ├── 3_alarma-digital.js          ← Alarma con sonido (incluye sonidos de CR7)
│   ├── 4_eventos_del_teclado.js     ← Bolita animada controlada con teclado
│   ├── 6_cuenta_regresiva.js        ← Cuenta regresiva hasta una fecha
│   ├── 7_traductor.js               ← Síntesis de voz (texto a voz) y grabación
│   ├── 8_scroll_btn_top.js          ← Botón flotante para volver al inicio
│   ├── 9_color_dark_theme.js        ← Modo oscuro con persistencia en localStorage
│   ├── 10_objeto_responsive.js      ← Muestra iframe o link según tamaño de pantalla
│   ├── 11_responsive_tester.js      ← Tester de responsive dentro de un iframe
│   ├── 12_video_camara.js           ← Acceso a cámara del dispositivo
│   └── 13_sorteo_aleatorio.js       ← Sorteo aleatorio entre participantes
└── secciones/
    ├── 1-reloj-digital-y-alarma-sonora.html
    ├── 2-eventos-del-teclado.html
    ├── 3-cuenta-regresiva.html
    ├── 4-estilos-usados.html
    ├── 5-bootstrap-4-6.html
    ├── 6-git.html
    ├── 7-hkas.html
    ├── 8-traductor-de-texto-y-traductor-de-voz.html
    ├── 9-react-instalacion-y-manejo-de-la-consola.html
    ├── 10-ux-ui.html
    ├── 11-estilos-material-ui-instalacion.html
    ├── 12-javascript-puro-y-para-react.html
    ├── 13-next-y-react-js-typescript.html
    ├── 14-handlebars.html
    ├── 15-github.html
    ├── 16-netsuite.html
    ├── 17-responsive-responsable.html
    ├── 18-responsive-tester.html
    ├── 19-cosas.html
    ├── 20-resumen-de-videos.html
    ├── 21-video-de-la-camara.html
    ├── 22-sorteo-aleatorio.html
    ├── 23-atajos-teclado.html
    ├── 24-front-back.html
    └── 25-extensiones-chrome.html
```

---

## Cómo Correr el Proyecto

El proyecto usa `fetch()` para cargar secciones, por lo que **no funciona abriendo el HTML directamente** desde el explorador de archivos (`file://`). Necesita un servidor HTTP.

### Opción 1 — Live Server en VS Code (desarrollo local)

1. Instalar la extensión **Live Server** (ritwickdey.liveserver)
2. Clic derecho en `08_dom-ejercicio-practico.html` → "Open with Live Server"
3. Se abre en `http://127.0.0.1:5501` (este proyecto usa el puerto 5501 en `.vscode/settings.json`)

### Opción 2 — GitHub Pages (publicación gratuita en internet)

El proyecto está pensado para desplegarse en **GitHub Pages**, el servicio gratuito de hosting estático de GitHub. Al estar en una rama `master` o `main`, se puede activar GitHub Pages directamente desde los ajustes del repositorio.

**URL pública resultante:** `https://<tu-usuario>.github.io/<nombre-del-repo>/08_dom-ejercicio-practico.html`

Ver la sección [Desplegar en GitHub Pages](#desplegar-en-github-pages) más abajo.

---

## Cómo Funciona — Arquitectura

### Shell + Secciones Lazy

`08_dom-ejercicio-practico.html` es el único archivo HTML raíz. Define:
- Un `<header>` sticky con el título
- Un `<aside class="panel">` con el menú de navegación (fullscreen, slide from top)
- Un `<main>` con 25 `<section id="seccionN">` vacíos
- Botones flotantes: hamburguesa, scroll-top, dark-theme

Las secciones están vacías en el HTML. `section-loader.js` usa `IntersectionObserver` para
detectar cuándo cada sección entra al viewport y en ese momento hace el `fetch()` del archivo HTML
correspondiente e inyecta el contenido via `innerHTML`.

Esto significa que al abrir la app solo se descarga el contenido de la primera sección visible.
Las demás se descargan a medida que el usuario hace scroll.

### Flujo de inicialización

```
Navegador parsea HTML
  → ES Modules descargados y ejecutados (type="module" = diferido)
    → darkaTheme() se llama ANTES de DOMContentLoaded (para evitar parpadeo de tema)
      → DOMContentLoaded dispara
        → hamburgerMenu() wired
        → scrollButton() wired
        → observeSections() registra IntersectionObserver en cada <section>
          → Usuario scrollea → sección entra al viewport
            → fetch(path) → innerHTML = html
            → onLoaded() ejecuta el widget de esa sección (reloj, traductor, etc.)
```

### Módulo section-loader.js (versión actual)

La versión anterior usaba `loadSections()` que hacía todos los `fetch()` al mismo tiempo
y luego inicializaba todos los widgets en un único `.then()`. Esto causaba:
- Descargas innecesarias de secciones que el usuario nunca ve
- Todos los widgets iniciando aunque sus elementos no estuvieran visibles

La versión actual usa `observeSection(id, path, onLoaded)`:
- `id`: id del `<section>` en el DOM
- `path`: ruta al archivo HTML de la sección
- `onLoaded`: función opcional que se ejecuta cuando el HTML ya está en el DOM

---

## Cómo Agregar una Nueva Sección

### 1. Crear el archivo HTML de la sección

Crear `secciones/26-nombre-del-tema.html` como fragmento HTML (sin `<html>`, `<head>`, `<body>`):

```html
<h2>Título del tema</h2>
<p>Contenido...</p>
```

### 2. Agregar la sección vacía en el HTML principal

En `08_dom-ejercicio-practico.html`, dentro de `<main>`:
```html
<section id="seccion26" class="section" data-seccion="Nombre del Tema"></section>
```

### 3. Agregar el link en el menú

En `08_dom-ejercicio-practico.html`, dentro de `<nav class="menu menuPrincipal">`:
```html
<a href="#seccion26" style="text-transform: uppercase;">Nombre del Tema</a>
```

### 4. Registrar en el entry point JS

En `08_dom-ejercicio-practico.js`, dentro del array de `observeSections`:
```javascript
{ id: "seccion26", path: "./secciones/26-nombre-del-tema.html" },
```

Si la sección tiene un widget JS que necesita elementos del DOM de esa sección:
```javascript
{
  id: "seccion26",
  path: "./secciones/26-nombre-del-tema.html",
  onLoaded: () => miWidget("#elemento-de-la-seccion")
},
```

---

## Módulos JS — Referencia Rápida

| Archivo | Función exportada | Sección que la usa | Descripción |
|---|---|---|---|
| `section-loader.js` | `observeSections()` | main.js | Lazy loading de secciones |
| `1_menu-hamburguesa.js` | `hamburgerMenu()` | global | Abre/cierra panel de navegación |
| `2_reloj-digital.js` | `relojDigital()` | seccion1 | Reloj digital en tiempo real |
| `3_alarma-digital.js` | `alarmaDigital()` | seccion1 | Alarma con sonido y texto a voz |
| `4_eventos_del_teclado.js` | `bolita()` | seccion2 | Mueve una bolita con las teclas |
| `6_cuenta_regresiva.js` | `cuentaRegresiva()` | seccion3 | Cuenta días/horas hasta una fecha |
| `7_traductor.js` | `traductor()` | seccion8 | Síntesis de voz + reconocimiento |
| `8_scroll_btn_top.js` | `scrollButton()` | global | Botón flotante scroll al inicio |
| `9_color_dark_theme.js` | `darkaTheme()` | global | Modo oscuro con localStorage |
| `10_objeto_responsive.js` | `responsiveMedia()` | seccion17 | Iframe o link según viewport |
| `11_responsive_tester.js` | `responsiveTester()` | seccion18 | Tester de diseño responsive |
| `12_video_camara.js` | `videoCamara()` | seccion21 | Stream de la cámara del dispositivo |
| `13_sorteo_aleatorio.js` | `draw()` | seccion22 | Sorteo aleatorio de participantes |

---

## Variables CSS (`:root`)

```css
--main-font          /* sans-serif */
--font-size          /* 16px */
--main-color         /* #f7df1e (amarillo) */
--second-color       /* #222 (oscuro) */
--main-modal-color   /* amarillo con 85% opacidad */
--second-modal-color /* oscuro con 85% opacidad */
--container-width    /* 100% */
```

El modo oscuro agrega la clase `dark-mode` a los elementos con `data-darkTheme`.

---

## Diseño Responsive

El sitio usa un enfoque **mobile-first**: los estilos base están pensados para móvil
y se sobreescriben con media queries para pantallas más grandes.

| Breakpoint | Viewport | Qué cambia |
|---|---|---|
| Base (móvil) | < 600px | Padding reducido, fuentes más chicas, botones más compactos, menú en full ancho |
| Tablet | ≥ 600px | Padding intermedio, fuentes medianas, botones normales, links de menú en `width: auto` |
| Desktop | ≥ 1024px | Padding máximo, fuentes grandes, secciones con `max-width: 1000px` para legibilidad |

Elementos responsivos considerados:
- **Header**: `h1` con font-size que escala de 1rem → 1.2rem → 1.5rem
- **Secciones**: padding que escala de 1rem → 1.5rem → 2rem
- **Botones flotantes** (hamburguesa, scroll-top, dark-theme): 3rem → 3.5rem → 4rem
- **Links del menú**: `width: 100%` en móvil (área de toque completa) → `width: auto` en tablet+
- **`<pre>` blocks**: `white-space: pre-wrap` + `word-break: break-word` para que no rompan el layout
- **Tablas**: clases `.tabla-responsive` con `overflow-x: auto` para scroll horizontal en móvil
- **Iframes**: clase `.iframe-wrapper` con padding-bottom 16:9 para iframes responsivos

---

## Desplegar en GitHub Pages

GitHub Pages sirve archivos estáticos directamente desde el repositorio, y como el proyecto usa `fetch()` sobre rutas relativas, funciona sin ningún cambio de código.

### Pasos para publicar

1. **Crear un repositorio en GitHub**
   - Ir a [github.com/new](https://github.com/new)
   - Nombre sugerido: `apuntes-js-jhon`
   - Visibilidad: Public (necesario para GitHub Pages gratuito)
   - **No** inicializar con README (ya existe uno)

2. **Conectar el repositorio local y hacer push**
   ```bash
   git remote add origin https://github.com/<tu-usuario>/apuntes-js-jhon.git
   git branch -M main
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - En el repositorio → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `(root)`
   - Guardar

4. **Acceder al sitio**
   - En unos minutos estará disponible en:
     `https://<tu-usuario>.github.io/apuntes-js-jhon/08_dom-ejercicio-practico.html`
   - Para ir directo al index, se puede renombrar o crear un `index.html` que redirija al archivo principal.

> **Nota sobre permisos de navegador:** La sección de cámara (`videoCamara`) y el traductor de voz (`traductor`) requieren HTTPS para funcionar. GitHub Pages sirve en HTTPS por defecto, así que funcionarán correctamente en producción.

---

## Correcciones Aplicadas en esta Versión

- `js/section-loader.js`: reescrito con `IntersectionObserver` (lazy loading real)
- `08_dom-ejercicio-practico.js`: eliminado el `debugger` que pausaba la ejecución en DevTools
- `08_dom-ejercicio-practico.js`: cada sección inicializa su widget en su propio `onLoaded`
- `08_dom-ejercicio-practico.html`: corregido `data-scroll-spy data-="..."` → `data-seccion="..."` en sección 1
- `08_dom-ejercicio-practico.css`: agregados estilos de skeleton loader y mensaje de error

---

*Proyecto iniciado como ejercicio del curso de programación con Jhon — continuado como cuaderno de apuntes personal*
