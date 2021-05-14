module.exports = {
    providers:{
        main:[
            '~/app/providers/AppProvider',
            // '~/app/providers/DatabaseProvider',
            '~/app/providers/RouteProvider',
        ],
        daemons:[
            // Providers to execute after main Providers.
        ],
    },
    middlewares:{
        // Middlewares for execute before all routes
        main:[
            '~/app/middlewares/Response',
            // '~/app/middlewares/FirebaseHeader',
            '~/app/middlewares/Input',
        ],
    },
};