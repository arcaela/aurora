



const { command, commands } = require('~/vendor/CLI');

command('start',{
    action(){
        console.log(123);
    }
});

command('command:list', {
    name:'command:list',
    usage:"Listar todos los comandos disponibles",
    action(){
        const logger = require('~/vendor/logger');
        logger.log("Aurora CLI".green ,"para servidores construídos en NodeJS.\n");
        logger.warn("Usage:");
        logger.log(`  command [options] [arguments]\n`);
        logger.warn(`Options (default):`);
        logger.log("-V, --version  output the version number");
        logger.log("-h, --help     display help for command");
        logger.warn(`\nAvailable commands:`);
        const Table = require('cli-table');
        const table = new Table();
        table.push(...Object.entries(commands)
            .sort((a,b)=>a[0]>b[0]?1:-1)
            .map(([key, options])=>({[key]:options._usage})));
        logger.log( table.toString() );
    },
});
