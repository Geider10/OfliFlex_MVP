![Background del nombre del proyecto](./assets/ofiflex.png)
## Tabla de Contenidos
1. [Presentación](#presentación)
2. [Instalación](#instalación)
3. [Desarrollo](#desarrollo)
4. [Herramientas](#herramientas)
5. [Despliegue](#despliegue)

## Presentación
OfiFlex es una aplicación full stack innovadora para  reservar y alquilar espacios de trabajo.
Conectamos a quienes necesitan un lugar para trabajar con quienes buscan generar ingresos alquilando su espacio.

### Caracteristicas
* Sistema de roles y gestión de usuarios
* Búsqueda avanzada y disponibilidad en tiempo real
* Diseño centrado en la experiencia de usuario
* Frontend moderno y responsivo
* Backend robusto y escalable

## Instalación
### Instrucciones de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Geider10/OfliFlex_MVP.git
    ```
2. Instalar dependencias:
    ```sh
    cd Frontend/Backend
    npm install
    ```

### Archivos de configuración
config "variables de desarrollo"
```sh
PORT 
MONGO_URI 
JWT_SECRET_KEY 
GOOGLE_CLIENT_ID 
GOOGLE_CLIENT_SECRET 
FRONTEND_URL 
```
### Utilizar aplicación
Levantar el backend
```sh
cd Backend
npm run dev
```
Levantar el frontend
```sh
cd Frontend
npm run dev
```

## Desarrollo
### Tecnologías
Frontend: JavaScript, React, Axios
Backend: JavaScript, Node.js, Express, MongoDB.

### Mejoras Futuras
* Sistema de reseñas y calificaciones.
* Integracion de pagos online.
* Agregar skeleton a los componentes.

## Herramientas
### Librerías del frontend
- [chakra-ui](https://www.chakra-ui.com/): Usada para diseñar una interfaz accesible y responsiva con componentes.
- [axios](https://axios-http.com/): Usada para hacer solicitudes HTTP y gestionar la comunicación con el backend.
- [bootstrap](https://getbootstrap.com/): La implemente para usar componentes ya diseñados. 
- [date-fns](https://date-fns.org/docs/Getting-Started):  Utilizada para formatear fechas y filtrar las reservas por activa/finalizada.
- [framer-motion](https://www.npmjs.com/package/framer-motion): Usada para crear animaciones suaves en las transiciones de la UI.
- [react](https://react.dev/): El núcleo de la aplicación, gestionando estados y renderización eficiente
- [react-bootstrap](): Utilizada para integrar componentes de Bootstrap.
- [react-hook-form](https://react-hook-form.com/): Implementada para hacer validaciones en los formularios.
- [react-icons](https://react-icons.github.io/react-icons/  ):Usada para añadir íconos personalizados en la la aplicación.
- [react-jwt](https://www.npmjs.com/package/react-jwt): Usada para manejar y verificar tokens JWT que vienen del backend.
- [react-router-dom](https://reactrouter.com/): Implementada para gestionar la navegación entre pantallas en la app.
- [react-toastify](https://www.npmjs.com/package/react-toastify):Usada para mostrar notificaciones emergentes de éxito o error.

### Librerías del backend
- [bcrypt](https://www.npmjs.com/package/bcrypt): Utilicé esta librería para encriptar contraseñas de los usuarios antes de almacenarlas en la base de datos.
- [cors](https://www.npmjs.com/package/cors): Lo usé para habilitar solicitudes entre dominios, permitiendo la conexión entre el frontend y el backend.
- [dotenv](https://www.dotenv.org/docs/): Fue útil para cargar variables de entorno sensibles como configuraciones del servidor.
- [express](https://expressjs.com/): Framework principal para crear el servidor y manejar las solicitudes del cliente al servidor.
- [jwt](https://jwt.io/introduction): Lo utilicé para generar y validar tokens seguros, manejando la autenticación de usuarios en rutas protegidas.
- [mongoose](https://mongoosejs.com/):Lo usé como un ODM para modelar esquemas y realizar operaciones en la base de datos.
- [multer](https://github.com/expressjs/multer): Middleware utilizado para manejar la carga de imágenes desde el frontend.
- [nodemailer](https://nodemailer.com/):Configuré esta librería para enviar correos electrónicos, como confirmaciones de registro y actualizaciones de reservas.
- [passport](https://www.passportjs.org/): Middleware que implementé para gestionar la autenticación de usuarios, facilitando el uso de estrategias como Google OAuth y JWT.
- [passport-facebook](): Usé esta estrategia de Passport para permitir a los usuarios iniciar sesión con sus cuenta de Facebook.
- [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/): Usé esta estrategia de Passport para permitir a los usuarios iniciar sesión con sus cuentas de Google.


## Despliegue
### Render (PaaS)
- Te permite desplegar el frontend y el backend desde una sola plataforma.
- La capa gratuita te asigna recursos (CPU, RAM, etc.)pero se pueden ajustar.
- Simplicidad y escalabilidad.

### Links
FRONTEND_URL : https://frontend-ofiflex.onrender.com

BACKEND_URL : https://backend-ofiflex.onrender.com