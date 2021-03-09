# ServerLess

En este documento les explicaré un poco de la estructura del Back - Front (ServerLess) de la plataforma.

## Importación
Para acceder a sus funciones o propiedas será necesario importarlas de manera genérica o específica:
```javascript
    import api, { useAuth, Google } from '~/ServerLess'
    import * as ServerLess from '~/ServerLess'
```

## Helper | [api](./api/README.md)
Esta función está mejor documentada en su propio [markdown](./api/README.md).

## Class | [ScopeBase](./scopes/README.md)
Esta clase está mejor documentada en su propio [markdown](./scopes/README.md).

## Hook | useAuth
**useAuth** es un hook construído para conocer el [User](./scopes/User.md) autenticado actualmente,
su valor puede estar estar establecido en 3 posibles resultados:
```javascript
    export default function ProfileButton(props){
        const user = useAuth();
        const online = !!user;
        const loading = user === null;
        const offline = user === false;
        return (<React.Fragment>
            <Button></Button>
            <Card>
                (online && <CardTitle children={ user.fullname } />)
                (loading && <CircularProgress size={32} />)
            </Card>
        </React.Fragment>);
    }
```

## Helper | getter
**getter** es una función que puede ser llamada dentro y fuera de un componente,
ella se encarga de convertir un objeto en una función pseudo accesible a sus propiedades,
les explicaré un poco más,
con un ejemplo :
```javascript
    const objeto = {
        a:1,
        b:2,
        c:{
            d:4,
            e:5,
        }
    };
    const _ob_ = getter(objeto);
    _ob_.f = 17
    _ob_('g', 18)
    _ob_('g.h', 18)
    console.log( _ob_ ); // {a:1,b:2,...}
    console.log( _ob_.a ); // 1
    console.log( _ob_.c ); // {d:4,...}
    console.log( _ob_.c.d ); // 4
    /*
        Es importante saber que estos objetos son mutados
        su valor se modifica con sus llaves,
        Hemos modificado "g" con un valor de 18,
        pero luego lo hemos reasignado como objeto.
    */
    console.log( getter('g') ); // {h:18}
    console.log( getter('g.h') ); // 18
```

## Hook | useInputs
Este hook en cuestión, es un objeto cuyas propiedes han sido mutadas con **getter**,
sirve para acceder a los campos por defecto de un modelo de usuario,
es el mismo que se utiliza al momento de hacer el registro,
allí vamos guardando de manera temporal la información que enviarémos luego al servidor :
```javascript
    export default function MyForm(props){
        const { inputs } = useInputs();
        const enviar = ()=>fetch('/',{
            email:inputs.email,
            email:inputs.password,
        });
        
        return (<form onsubmit={ enviar }>
            <input onkeyup={ inputs.email=this.value } />
            <input onkeyup={ inputs('password', this.value) } />
            <button type="submit" />
        </form>);
    }
```


## Helper | Google
Es un objeto con instancias de Google bajo demanda, sirve para hacer consultas a la API de **Google Maps** de manera asícrona, teniendo en cuenta que se resuelve en promesas.
```javascript
    async function BuscarCiudad(ciudad){
        return Google.ready(google=>{
            return google.maps[...]
        });
    }
```

## Throw | error
Función destinada a causar throws sin llamar instancias de Error para ello.
```javascript
    async function Buscar(){
        const user = await Promise.resolve({});
        // Antes
        if(!user.name)
            throw new Error("No tiene nombre");
        // Ahora
        if(!user.name)
            error("No tiene nombre");
    }
```
