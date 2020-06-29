# DeliahExpo
Tercer proyecto del curos Desarrollo WEB full Stack de Acámica.

## Requisitos
- Node.js
- NPM (gestor de paquete de datos)
- MySQL
- Postman (manejo de endpoints y testing)
- Swagger (documentación de API)
## Instalacion:
Clonar o Descargar el repositorio desde: (https://github.com/SantiagoDRP37/DeliahExpo).

Comando desde la consola:
    
`-git clone https://github.com/SantiagoDRP37/DeliahExpo.`

### Instalar dependencias:
Debemos abrir carpeta de nuestro crepocitorio y realizar el siguiente comando:

```
npm install
```
### Crear la Base de datos:
Debemos tener instalado un gestor de base de datos MySql y corriendo en puerto 3306:

- Usamos Xampp y inicamos los servicios de Apache y MySQL.
- Abrimos un navegador web con la siguiente direccion: http://localhost/phpmyadmin/server_sql.php
- Podemos importar el archivo `CreacionDB.sql` que se encuentra en `DeliahExpo/DataBase/` que contiene las querias de creacion y poblacion de tablas

### Iniciar el servidor
Abrir el archivo `DeliahExpo/Server/server.js` desde Node con el siguiente comando de terminal:
```
node server.js
```
listo para usar
## Testeo
Para probar los endpoints desde postman debes importar la coleccion del repositorio del siguiente archivo: `Delilah Resto.postman_collection.json`

## Documentacion
La documentacion de la API se encuentra en el archivo `openapi.yaml`, si deeamos visialuzarla debemos ingresar a la siguiente pagina web:

`https://editor.swagger.io/#`

Y copiar la informacion del archivo `openapi.yaml` en la columna izquierda.
