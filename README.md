# ANGULAR JS - APP
# AUTH: Roger Bariles Rojas

El presente proyecto se realizo con la version 1.7.5 de AngularJS, utilizando las hojas de estilo
de Bootstrap 5, utilizandolo atravez de su script proporcionalido desde: https://getbootstrap.com/.

Se utilizo el sistema de gestión de paquetes NPM con la version: 6.14.6

# INICIALIZACION DEL PROYECTO 
1 - npm install  ( Descargara las dependencias que se instalo) 

2 - npm start (Para levantar el proyecto de manera local)


# ESTRUCTURA DEL PROYECTO

app/                 
  app.css  --> hoja de estilo por default

  seccions/  --> Secciones del proyecto
    login/ --> modulo, controlador, template de login
      login.html --> template , muestra un formlario usuario/contraseña
      login.js   --> logica del controlador
      login.spec.js  --> tests del controlador
    data/ --> modulo, controlador, template de data ()
      data.html --> template , una tabla informativa con filtros
      data.js   --> logica del controlador
      data.spec.js  --> tests del controlador
    
  app.js  --> modulo de la aplicacion, controladores, interceptores, servicios
  index.html 

package.json          --> informacion de las dependencias instaladas y scripts utiles
package-lock.json     --> informacion detallada de dependencias y archivos propios de angularJS