# Proceso y decisiones

Escribo aquí algunas decisiones que voy tomando mientras hago la prueba:

- Aunque Vite va por la versión 8, uso la 6. En un principio lo hice para poder usar Node 18, tal y como pide el PDF, pensando en que el servidor de la aplicación puede ser difícil de actualizar. Después vi que Vitest 4, jsdom 29, React Router 7 y Playwright ya exigen Node 20 o superior, y Node 18 está EOL desde abril de 2025, así que el proyecto pasa a Node 24 (LTS), fijado con `.nvmrc`, `engines` y CI. Como el resultado es un build estático, el servidor de despliegue no necesita Node: se compila en CI y solo se sirve `dist/`. Si Node 18 fuera un requisito estricto de la máquina que compila, habría que bajar de versión React Router (6), Vitest, jsdom y Playwright.
- Creo un repositorio en github privado, por cuestiones de confidencialidad. Una vez terminada la prueba lo hago público, tal y como pide el PDF.
- No uso Typescript por ahora ya que no es requisito en la prueba.
- Pensando en cuál es la mejor manera de organizar los archivos (providers, context, components, etc) sería interesante hacer un vertical slicing por funcionalidad, pero creo que al ser un app "pequeña" puede ser práctico hacer una estructura por capas: páginas, components, estilos, etc.
- Decido esconder la API key en un .env.local de manera que no entre en el histórico de GIT de buenas a primeras, así no tendré que "rehacer" la história de GIT para quitarla. Sigue estando accesible por el frontal, se tendría que llamar desde un Backend.
- Parece que solo Helvetica en mac os / firefox se ve un poco mal. En diseño se usa Helvetica Neue así que también lo aplico.
- Decido usar una función Debounce para las llamadas a la base de datos desde el filtro. Si el Debounce se usa en otro componente puede que lo use como un custom hook, por ahora no.
- Hago un dedupe de los elementos que devuelve el servidor para quitar duplicados
- Me surgen dudas sobre accesibilidad + ui del input de filtro. Seria ideal poder hablar con diseño sobre estas best practices (https://uxdesign.cc/best-ux-practices-for-search-inputs-c44dba565448). Cosas que yo veo:
  - seria ideal tener un label visible.
  - poner el icono de lupa podría ayudar también
- para la navegación entre páginas y detalle usaré react-router-dom por ser una solución estable y que encaja con la dimensión y los requisitos de proyecto.
