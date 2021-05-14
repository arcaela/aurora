const { scandir } = require("../../vendor");
module.exports = {
    /* Se llama el método boot apenas se instancia el modelo de datos */
    boot(){ this.webRoutes(); },
    /* Cargamos todos los archivos dentro de la carpeta /routes/web de manera recursiva */
    webRoutes(){
        scandir( __dirname, '../../routes/web' ).forEach(({path})=>require(path));
    },
};