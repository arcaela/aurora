const { Provider } = require('~/core');
module.exports = class AppProvider extends Provider {
    //  this.Aliasses : Aliasses Instance
    //  this.Command : Command Instance
    //  this.Logger : Logger Instance
    //  this.Provider : This Provider class interface
    //  this.Router : Express Router Instance
    //  this.Socket : SocketIO Instance
    //  this.Kernel : Kernel config options of Kernel File
    //  this.PackageJSON : PackageJSON file in JSON Format
    /* Se llama el método boot apenas se instancia el modelo de datos */
    async boot(){

    }
};