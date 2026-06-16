/**
 * section-loader.js
 *
 * Carga secciones de forma lazy usando IntersectionObserver.
 * Cada sección solo se descarga cuando el usuario está por llegar a ella (rootMargin 250px),
 * en lugar de cargar todas al mismo tiempo al iniciar la página.
 *
 * También intercepta clics en enlaces del menú (#hash) para cargar bajo demanda
 * la sección destino si aún no está cargada, y luego hace scroll hacia ella.
 *
 * Parámetros de observeSection:
 *   id        {string}    - id del elemento <section> en el DOM
 *   path      {string}    - ruta relativa al archivo HTML de la sección
 *   onLoaded  {function}  - callback opcional que se ejecuta cuando el HTML ya está en el DOM
 */

// Map que guarda la configuración de CADA sección registrada.
// La key es el id (ej: "seccion1") y el value es un objeto con:
// { section (el elemento DOM), path (ruta al .html), onLoaded (callback), observer (el IntersectionObserver) }
// Esto permite buscar cualquier sección por su id y cargarla en cualquier momento.
const sectionRegistry = new Map();

// Set que guarda los ids de las secciones que YA se cargaron exitosamente.
// Se usa para evitar cargar dos veces la misma sección (si ya está en el Set, se salta).
const loadedSections = new Set();

// Muestra una animación de "esqueleto" dentro de la sección mientras se espera
// a que el fetch descargue el HTML real. Le da feedback visual al usuario
// de que algo se está cargando en ese espacio.
function mostrarSkeleton(section) {
  section.innerHTML = `
    <div class="skeleton-loader">
      <div class="sk-titulo"></div>
      <div class="sk-linea"></div>
      <div class="sk-linea"></div>
      <div class="sk-linea sk-corta"></div>
    </div>
  `;
}

// Función central que carga UNA sección por su id.
// Es async porque hace fetch (petición HTTP) para traer el archivo .html de la sección.
// Tanto el IntersectionObserver (scroll) como la navegación por menú (clic) usan esta misma función.
async function loadSection(id) {
  // Si ya se cargó antes, no hace nada (evita peticiones duplicadas)
  if (loadedSections.has(id)) return;

  // Busca la configuración de esta sección en el registro (Map)
  const config = sectionRegistry.get(id);
  if (!config) return;

  // Desestructura: saca el elemento DOM, la ruta, el callback y el observer
  const { section, path, onLoaded, observer } = config;

  // Desconecta el IntersectionObserver de esta sección porque ya no lo necesitamos,
  // la sección se va a cargar ahora mismo (ya sea por scroll o por clic del menú)
  if (observer) observer.disconnect();

  // fetch() hace una petición HTTP GET al archivo .html de la sección
  // Ejemplo: fetch("./secciones/1-reloj-digital-y-alarma-sonora.html")
  const res = await fetch(path);
  // Si el servidor responde con error (404, 500, etc.), lanza un error
  if (!res.ok) throw new Error(`HTTP ${res.status} al intentar cargar ${path}`);

  // res.text() convierte la respuesta en texto (el HTML de la sección)
  // y lo inyecta dentro del <section> reemplazando el skeleton
  section.innerHTML = await res.text();

  // Agrega la clase "loaded" al <section> (puede usarse en CSS para estilos post-carga)
  section.classList.add("loaded");

  // Marca esta sección como cargada en el Set para no volver a cargarla
  loadedSections.add(id);

  // Si se pasó un callback onLoaded, lo ejecuta AHORA que el HTML ya está en el DOM.
  // Esto es clave para inicializar widgets JS que necesitan encontrar elementos
  // dentro de la sección (ej: el reloj, la alarma, el traductor, etc.)
  if (typeof onLoaded === "function") onLoaded(section);
}

// Registra UNA sección para lazy loading.
// Se llama desde observeSections() para cada sección de la lista.
// Crea un IntersectionObserver que vigilará cuándo la sección entra al viewport.
export function observeSection(id, path, onLoaded) {
  // Busca el elemento <section id="seccion1"> en el DOM
  const section = document.getElementById(id);
  if (!section) {
    console.warn(`[section-loader] No se encontró la sección con id "${id}".`);
    return;
  }

  // Coloca el skeleton animado dentro de la sección vacía mientras no se cargue
  mostrarSkeleton(section);

  // IntersectionObserver vigila si un elemento está visible en el viewport.
  // rootMargin: "250px 0px" significa que dispara 250px ANTES de que la sección
  // sea visible, dando tiempo a que el fetch termine antes de que el usuario llegue.
  const observer = new IntersectionObserver(
    (entries) => {
      // entries[0].isIntersecting es true cuando la sección está por entrar al viewport
      if (entries[0].isIntersecting) {
        // Deja de observar esta sección (ya se va a cargar, no necesitamos seguir vigilando)
        observer.disconnect();
        // Llama a loadSection para hacer el fetch e inyectar el HTML
        // Si falla, muestra un mensaje de error dentro de la sección
        loadSection(id).catch((err) => {
          console.error("[section-loader]", err);
          section.innerHTML = `
            <p class="seccion-error">
              ⚠️ Error al cargar la sección: ${err.message}<br>
              <small>Abrí el proyecto con Live Server (VS Code) o un servidor local. No funciona con file://.</small>
            </p>`;
        });
      }
    },
    { rootMargin: "250px 0px" }
  );

  // Guarda toda la configuración de esta sección en el registro (Map)
  // para que loadSection() y loadSectionsUpTo() puedan encontrarla después
  sectionRegistry.set(id, { section, path, onLoaded, observer });

  // Empieza a vigilar esta sección (el observer queda activo hasta que se cargue)
  observer.observe(section);
}

// Función principal que se llama desde 08_dom-ejercicio-practico.js
// Recibe un array de objetos { id, path, onLoaded } y registra cada sección.
// Al final activa la navegación por hash para que los clics del menú funcionen.
export function observeSections(lista) {
  // Recorre la lista y llama observeSection() para cada sección
  // Esto las registra en el Map Y les pone el IntersectionObserver
  lista.forEach(({ id, path, onLoaded }) => observeSection(id, path, onLoaded));

  // Activa el interceptor de clics en enlaces #hash y el soporte para URL con hash
  setupHashNavigation();
}

// Carga todas las secciones desde la primera hasta la sección destino (inclusive).
// Esto es necesario porque al hacer clic en ej: #seccion25, las secciones intermedias
// (4, 5, 6... 24) son skeletons con altura mínima. Si solo cargamos la 25 y hacemos
// scroll, mientras baja el scroll las intermedias se cargan y expanden su altura,
// empujando la sección 25 más abajo. El scroll termina pero la 25 ya se movió.
// Cargando TODAS las intermedias primero, la altura de la página queda estable.
async function loadSectionsUpTo(targetId) {
  // Obtiene todos los ids registrados en orden (el mismo orden del DOM)
  const allIds = [...sectionRegistry.keys()];

  // Busca en qué posición está la sección destino
  const targetIndex = allIds.indexOf(targetId);
  if (targetIndex === -1) return;

  // Toma desde la primera sección hasta la destino (inclusive)
  // y filtra solo las que NO están cargadas aún
  const idsToLoad = allIds
    .slice(0, targetIndex + 1)
    .filter((id) => !loadedSections.has(id));

  // Promise.all carga TODAS en paralelo (varios fetch al mismo tiempo)
  // .catch en cada una evita que si una falla, las demás se cancelen
  await Promise.all(
    idsToLoad.map((id) => loadSection(id).catch(console.error))
  );
}

// Configura dos cosas:
// 1) Un listener global de clics que intercepta enlaces del menú con href="#seccionX"
// 2) Soporte para cuando la página se abre directamente con un hash en la URL
function setupHashNavigation() {

  // Al recargar la página, siempre empezar desde arriba (sección 1).
  // scrollRestoration = "manual" le dice al navegador que NO restaure
  // la posición de scroll que tenía antes de recargar.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  // --- 1) INTERCEPTOR DE CLICS EN ENLACES #HASH ---
  // Escucha TODOS los clics en el documento
  document.addEventListener("click", (e) => {
    // .closest() busca si lo que se clickeó es (o está dentro de) un <a href="#...">
    // Si no es un enlace con hash, link será null y salimos con return
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    // Extrae el id destino quitando el "#" del href
    // Ej: href="#seccion25" → targetId = "seccion25"
    const targetId = link.getAttribute("href").slice(1);

    // Si esta sección no está en nuestro registro, no es nuestra responsabilidad
    // (podría ser un enlace a otro elemento que no es una sección lazy)
    if (!sectionRegistry.has(targetId)) return;

    // Si la sección YA está cargada, dejamos que el navegador haga el scroll
    // nativo con su comportamiento normal (no intervenimos)
    if (loadedSections.has(targetId)) return;

    // La sección NO está cargada → evitamos el comportamiento por defecto del enlace
    // (que intentaría scrollear a una sección con contenido skeleton)
    e.preventDefault();

    // Cargamos todas las secciones intermedias + la destino
    // y cuando termina (.then), hacemos scroll suave hasta ella
    loadSectionsUpTo(targetId)
      .then(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      })
      .catch(console.error);
  });

}
