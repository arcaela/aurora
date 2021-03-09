const { Route } = require('@arcaela/aurora-js');
/*
    El uso de Route está designado a la construcción de Vistas dinámicas
    con renderizado en tiempo real;
    A continuación se muestra la estructura completa.
    [ metodo(TypeOf) : Estado de uso ]

    @ Route(String, ReactNode) : Required | Optional
        .path(String) : Optional
        .render(ReactNode) : Optional
        .redirect(String) : Optional

    @ Route.fallback(ReactNode);

    @ URL Example:
        /path : Exactamente la ruta indicada
        /path? : Ruta Opcional
        /path/:username : $username [ Requerido ]
        /path/:username? : $username [ No Requerido ]

    - Las rutas son incorporadas en el orden que son declaradas.
    - Las rutas nuevas sobreescriben las previas.
*/
Route('/', require('~/pages/Welcome').default);
Route('/:documentation', (req)=>{
    const urls = {
        firebase:'https://firebase.google.com/docs',
        react:'https://es.reactjs.org/docs/getting-started.html',
        material:'https://material-ui.com/es/getting-started/installation/',
    };
    setTimeout(()=>(window.location.href=urls[req.params.documentation]), 2000);
    return (<span>Saliendo de aurora, por favor espere...</span>);
});
// Route('/', <Welcome />);
// Route('/welcome', (req)=>req.redirect('/'));
// Route('/', (req)=><Welcome tab="modal-card" {...req} />);
// Route('/profile/:username', ({params:{username}})=>req.redirect(`/${username}`));s