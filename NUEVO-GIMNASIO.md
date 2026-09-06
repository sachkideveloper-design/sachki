# Cómo adaptar este proyecto a un gimnasio nuevo

Este proyecto está pensado para clonarse: cada gimnasio cliente tiene su
propio proyecto de Firebase y su propio repositorio (copia de este).
Sigue esta lista en orden — todo lo demás de la app ya es genérico y no
necesita tocarse.

## 1. Crear el proyecto de Firebase
- Ve a https://console.firebase.google.com → "Agregar proyecto".
- Activa estos productos (todos están en el plan gratuito "Spark" para
  empezar, aunque Storage y Auth con muchos usuarios eventualmente
  pueden requerir el plan "Blaze" de pago por uso):
  - **Authentication** → método "Correo/contraseña".
  - **Firestore Database** → modo producción.
  - **Storage** → modo producción (para las fotos de perfil).
  - **Hosting**.

## 2. Configurar el código
- **`firebase-init.js`**: reemplaza el objeto `firebaseConfig` completo por
  el de este nuevo proyecto (Configuración del proyecto → tus apps → Config).
- **`.firebaserc`**: cambia el `project id` al de este proyecto nuevo.
- **`gym-config.js`**: cambia `nombre`, `eslogan`, `colorPrimario`,
  `colorFondo`. Esto se aplica solo en toda la app (splash, login, header,
  banner de instalación).
- **Logos**: reemplaza estos 3 archivos manteniendo los mismos nombres
  (o cambia las rutas en `gym-config.js` si prefieres otros nombres):
  - `IMG_7396.jpeg` (splash / login)
  - `logo-fitmanyacts-horizontal.png` (header del dashboard)
  - `logo-portada.png` (ícono de instalación / PWA)
- **`manifest.json`**: cambia `name`, `short_name`, `theme_color`. El
  navegador lee este archivo ANTES de que cargue el JS, así que no puede
  ser dinámico — hay que editarlo a mano.
- **`index.html`**: cambia el `<meta name="description">`, `<title>` (si
  quieres que ya cargue bien antes de que corra el JS) y el ícono SVG
  inline del `<link rel="icon">` (las iniciales "FM" y el color).

## 3. Desplegar
- `firebase deploy` (o tu GitHub Action, si ya la configuraste) sube
  Hosting + las reglas de Firestore + las reglas de Storage, los 3 en un
  solo comando gracias a que `firebase.json` ya los declara todos.
- Corre `setup.html` UNA vez para crear al dueño/coach inicial en
  Firestore (edita ahí mismo los datos de esa persona antes de correrlo),
  y bórralo del proyecto después de usarlo.

## 4. Recepción (check-in con QR)
- En la computadora de recepción, abre `tuapp.web.app/kiosko.html` y
  deja la pestaña abierta todo el día (o ponla en pantalla completa).
- Inicia sesión ahí UNA vez con una cuenta de coach/dueño.
- Conecta el lector USB de códigos QR — funciona como teclado, no
  necesita instalación ni drivers especiales en la mayoría de los casos.

## 5. Qué NO necesita tocarse
Todo lo demás — reservas de clases, reportes, reto 90 días, roles,
reglas de seguridad, el sistema de fotos de perfil, el QR rotativo —
ya es genérico y funciona igual para cualquier gimnasio sin tocar código.
