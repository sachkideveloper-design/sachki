// gym-config.js
// ─────────────────────────────────────────────────────────────────────────────
// ÚNICO archivo que debes editar para adaptar esta app a un gimnasio nuevo,
// junto con:
//   1) firebase-init.js  -> el firebaseConfig del proyecto de Firebase de ESE gimnasio
//   2) manifest.json     -> "name", "short_name", "theme_color" (el navegador lo
//                           lee antes de que cargue el JS, así que no puede ser dinámico)
//   3) los archivos de logo (reemplaza logo-portada.png / logo-fitmanyacts-horizontal.png,
//                             o cambia las rutas de abajo si usas otros nombres)
//
// Todo lo demás (textos en pantalla, colores del tema) se aplica solo, en
// automático, con aplicarMarca() más abajo.
// ─────────────────────────────────────────────────────────────────────────────

const GYM_CONFIG = {
    nombre: 'FITMANYACTS',
    nombreCorto: 'FITMANYACTS',
    eslogan: 'Hybrid Training',

    // Colores del tema (deben coincidir con las variables --primary-color / --bg-color
    // que ya existen en styles.css; esto las sobreescribe en tiempo de ejecución)
    colorPrimario: '#c1fe40',
    colorFondo: '#000000',

    logoSplash: 'IMG_7396.jpeg',                        // splash screen y login
    logoHeader: 'logo-fitmanyacts-horizontal.png',       // header del dashboard (banner ancho)
    logoIcono: 'logo-portada.png',                       // banner de instalación / ícono chico

    // Reglas de negocio configurables por gimnasio
    cupoMaximoPorClase: 20,
    duracionCodigoAccesoMs: 30000 // cada cuánto se regenera el QR de acceso (30s)
};

window.GYM_CONFIG = GYM_CONFIG;

// Aplica la marca a los textos y colores de la página. Se llama una vez al
// cargar (ver app.js -> DOMContentLoaded).
function aplicarMarca() {
    const cfg = window.GYM_CONFIG;
    if (!cfg) return;

    document.documentElement.style.setProperty('--primary-color', cfg.colorPrimario);
    document.documentElement.style.setProperty('--bg-color', cfg.colorFondo);
    document.title = cfg.nombre;

    document.querySelectorAll('[data-gym-nombre]').forEach(el => el.textContent = cfg.nombre);
    document.querySelectorAll('[data-gym-eslogan]').forEach(el => el.textContent = cfg.eslogan);
    document.querySelectorAll('[data-gym-logo-splash]').forEach(el => el.src = cfg.logoSplash);
    document.querySelectorAll('[data-gym-logo-header]').forEach(el => el.src = cfg.logoHeader);
    document.querySelectorAll('[data-gym-logo-icono]').forEach(el => el.src = cfg.logoIcono);
}
