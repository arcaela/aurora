# [Documentación](../README.md)

## Api | Function
La función **api** es un helper que permite la estructuración de canales y rutas para solicitudes cliente/servidor,
para su configuración solo se requiere importar la función y hacer uso de su propiedad **.load**.

```javascript
    import { api } from '~/ServerLess'

    // Si quieres anexar un objeto en rutas sería:
    api.load({
        ruta(){},
    });

    // Si la importación es múltiple y requieres cargar una lista de rutas sería:
    api.load([
        { ruta(){} },
        { ruta2(){} },
    ]);
```

## Uso

La función de api puede recibir y no recibir argumentos adicionales.
Asumiendo que la ruta indicada es dinámica, la función a ejecutar recibiría dos (2) parámetros:

> - Parámetros de la url
> - Propiedades enviadas en la solicitud


```javascript
import { api } from '~/ServerLess';

api.load({
    // api('feed')
    feed(){ },

    accounts:{
        // api('accounts')
        index(){
            return [];
        },

        // api('accounts/me')
        me(){ return "Hola, soy 'Fulano'" },

        // api('accounts/arcaela')
        // api('accounts/jhon.doe')
        ':username'(params, props){
            console.log(params, props);
        },
    },

    ':ruta':{
        // api('route/also_route')
        ':subruta'(params){
            console.log(params); // { ruta:'route', subruta:'also_route' }
        }
    },

});


// Utilizando el ejemplo anterior de rutas
// accounts/:username
const user = api('accounts/arcaela', { only:"feed" })
    .then(info=>console.log(info))

// console: {username:'arcaela'}, {only:'feed'}
```