MI PORTAFOLIO | DESARROLLADOR WEB - SITIO WEB OFICIAL

[Imagen de portada: image/shazam.png (representativa)]

Sitio web de portafolio profesional para desarrollador full stack, diseñado para mostrar habilidades técnicas, proyectos realizados y facilitar el contacto con potenciales clientes o empleadores. Incluye secciones informativas, una interfaz moderna y elementos interactivos como música de fondo y animaciones.

DESCRIPCIÓN

Este proyecto es una página web estática de una sola página (landing page) que funciona como portafolio personal. Presenta al desarrollador, sus competencias técnicas, las herramientas que utiliza, una galería de proyectos destacados y un formulario de contacto con validación. El diseño es oscuro con acentos en azul y naranja, y está completamente optimizado para dispositivos móviles.

CARACTERÍSTICAS

- Diseño responsive adaptable a móviles, tablets y desktop.
- Barra de navegación fija con iconos de Bootstrap Icons.
- Sección "Sobre mí" con una tarjeta giratoria (flip card) que muestra información adicional y un enlace de descarga de CV.
- Música de fondo con controles de volumen y mute (ocultables).
- Sección de habilidades técnicas con barras de progreso y porcentajes visuales.
- Sección de herramientas con tarjetas descriptivas.
- Carrusel de proyectos con imágenes y enlaces.
- Formulario de contacto con validación en JavaScript, campos obligatorios y selector de asunto.
- Checkbox de términos y condiciones que abre un modal (aunque el modal no está definido en el HTML, pero se menciona el enlace).
- Pie de página con enlaces a redes sociales (Facebook, Twitter, LinkedIn, GitHub).

TECNOLOGÍAS UTILIZADAS

- HTML5 - Estructura semántica.
- CSS3 - Estilos personalizados (archivos index-style.css y validacion.css).
- Bootstrap 5 - Framework CSS para componentes y grid.
- Bootstrap Icons - Iconos vectoriales.
- JavaScript - Validación de formulario, control de música, efectos de scroll y carrusel.
- Audio HTML5 - Reproducción de música de fondo.

ESTRUCTURA DE ARCHIVOS

/
├── index.html                           # Página principal
├── css/
│   ├── index-style.css                   # Estilos principales
│   └── validacion.css                     # Estilos para validación de formulario
├── js/
│   ├── validacion.js                      # Validación del formulario de contacto
│   ├── navScroll.js                        # Cambio de clase en navbar al hacer scroll
│   ├── musicaFondo.js                      # Control de música de fondo
│   └── carrousel.js                         # Configuración del carrusel (opcional, puede estar en línea)
├── Images/                                 # Carpeta de imágenes
│   ├── portrait-abel.png                       # Foto de perfil
│   ├── shazam.png                               # Imagen proyecto 1
│   ├── spotify.png                              # Imagen proyecto 2
│   └── youtube.png                              # Imagen proyecto 3
├── music/
│   └── musicFondo.mp3                          # Música de fondo
├── assets/
│   └── favicon.png                             # Favicon
└── README.txt                                   # Este archivo

INSTALACIÓN Y USO

1. Clonar el repositorio (si está disponible):
   git clone https://github.com/tuusuario/mi-portafolio.git

2. Abrir el archivo index.html en cualquier navegador web moderno.

3. Para desarrollo: se recomienda usar un servidor local (como Live Server de VS Code) para evitar problemas de CORS con los archivos de audio y scripts.

PERSONALIZACIÓN

- Cambiar imágenes: Reemplaza los archivos en la carpeta Images/ manteniendo los mismos nombres o actualiza las rutas en el HTML.
- Modificar estilos: Edita los archivos CSS en la carpeta css/.
- Actualizar información personal: Modifica los textos en las secciones "Sobre mí", habilidades, herramientas y proyectos.
- Cambiar música de fondo: Reemplaza music/musicFondo.mp3 por otro archivo de audio.
- Redes sociales: Actualiza los enlaces en el footer con tus perfiles.
- CV: Cambia la ruta del archivo "tu-cv.pdf" en el botón de descarga de la flip card.

CAPTURAS DE PANTALLA

| Vista Desktop | Vista Móvil |
|---------------|-------------|
| [Inserta aquí una captura del hero] | [Inserta aquí una captura móvil] |

CONTACTO

Para consultas o colaboraciones, puedes utilizar el formulario de contacto en la sección #contacto o escribir a través de las redes sociales:

- Facebook: https://www.facebook.com/abel.arriagadaurriola/
- GitHub: https://github.com/ab3leitor
- Twitter: (enlace pendiente de actualizar)
- LinkedIn: (enlace pendiente de actualizar)

También puedes enviar un correo electrónico mediante el formulario (la funcionalidad de envío real no está implementada; solo validación).

LICENCIA

Este proyecto es de propiedad del desarrollador. Todos los derechos reservados. No se permite su uso comercial sin autorización previa.

--- Hecho con ❤️ para mostrar el camino en el desarrollo web. ---
