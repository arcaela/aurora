module.exports = {
    providers:{
        main:[
            '~/app/providers/AppProvider',
            '~/app/providers/RouteProvider',
        ],
        daemons:[],
    },
    middlewares:[

    ],
    aliasses:{
        // '@app':aurora.paths.src("app/"), // require('@app/models') = require('src/app/models')
    },
};