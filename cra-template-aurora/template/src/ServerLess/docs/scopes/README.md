# [Documentación](../README.md)

## ScopeBase | SnapshotBase
La clase **ScopeBase** es una clase modelo, que conecta el objeto de un registro con su ubicación en la base de datos, lo cuale facilita las modificaciones de dicho registro directamente desde el Fron-End.

> Por ahora solo está conectada a instancias de Firebase

```javascript
    import { scopes } from '~/ServerLess'
    //                    o
    const { scopes } = require('~/ServerLess');
```


```javascript
const doc = await scopes.users.doc(id).get();
const docs = await scopes.users.where(fieldName, '==', fieldValue).get();

// Se retornan las propiedades del Objeto indicado sumando los siguientes $helpers
{
    $has(path: String 'key.subkey'): any
    $get(path: String 'key.subkey'): any
    $set(path: String 'key.subkey', value: any): value

    $toJSON(): Object | SnapshotObject
    $save(): Promise
    $delete(): Promise
    $update(props: Object, save: Boolean): Promise
}
```

> **Nota:** Todos los helpers deben tener '$' como prefijo, ya que sus propiedades podrían interferir con el nombre de algún "$helper".