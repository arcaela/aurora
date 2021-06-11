const { Provider } = require('~/core');
module.exports = class RouteProvider extends Provider {
    // server = null; Server Instance
    // app = null; Express Router Instance
    /* Se llama el método boot apenas se instancia el modelo de datos */
    async boot(){ this.web(); }

    web(){
        this.Router.use((...[,,n])=>n(), ...this.Kernel.middlewares.map(fn=>(typeof fn==='string'?require(fn):fn)) )
        require( aurora.paths.routes("web") );
    }
};
