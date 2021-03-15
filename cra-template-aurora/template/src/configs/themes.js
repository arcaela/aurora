import { Theme } from '@arcaela/aurora';
/*
    Puedes utilizar la misma estructura de Material-UI en createMuiTheme()
    En caso de no conseguir un Tema será por defecto DEFAULT

    @ Theme.create(key (String), props (Object) ) 
        => [ Global Theme Object ]
    @ Theme.use(key (String) )
        => [ Selected Theme Object ]
*/
Theme.create('DEFAULT', {
    palette:{
        primary:{
            light:'#415768',
            main:'#122E43',
            dark:'#0c202e',
        },
        secondary:{
            light:'#5b971b',
            main:'#82D827',
            dark:'#9bdf52',
        },
    },
})
// Theme.use('ThemeName');