module.exports = {
    Aliasses:require('./Aliasses'),
    Command:require('./Command'),
    Logger:require('./Logger'),
    Provider:require('./Provider'),
    Router:require('./Router'),
    Socket:require('./Socket'),
    Storage:require('./Storage'),
    Kernel: require('../app/Kernel'),
    PackageJSON: require('../../package.json'),
    vendor:{
        directory:require('./vendor/directory'),
        ucfirst:require('./vendor/ucfirst'),
    },
};