require('colors');
const _ = require('lodash');
const uuid = require('uuid');
const commander = require('commander');
const { default: toARGV } = require('string-argv');


const commands = {};

function Command(name, props){
    name = String(name).toLowerCase().replace(/[^a-zA-Z:]+/gi,'');
    return commands[name] = {
        props:{
            options:[],
            arguments:'<command> [tags]',
            allowUnknownOption:true,
            version:'Aurora Version: 1.0.0',
            usage:'Aurora CLI para servidores construídos con NodeJS.',
            ...props,
            name,
        },
        $events:{},
        before(executer){
            const key = uuid.v4();
            _.set(this.$events, `before.${key}`, executer);
            return ()=>_.unset(this.$events, `before.${key}`);
        },
        after(executer){
            const key = uuid.v4();
            _.set(this.$events, `before.${key}`, executer);
            return ()=>_.unset(this.$events, `before.${key}`);
        },
        async exec(argv){
            argv = toARGV(_.concat('index.js','commander',this.props.name, argv).map(str=>typeof str!=='object'?str:'').join(" "))
            const program = new commander.Command();
            if (this.props.version) program.version(this.props.version)
            if (this.props.name) program.name(this.props.name)
            if (this.props.usage) program.usage(this.props.usage)
            if (this.props.arguments) program.arguments(this.props.arguments)
            if ('allowUnknownOption' in this.props) program.allowUnknownOption(this.props.allowUnknownOption)
            if (typeof this.props.action==='function') program.action(this.props.action)
            for(let option of this.props.options){
                (option.macros||[]).forEach(macro=>(option.defaultValue=argv.includes(macro.tag)?macro.value:option.defaultValue));
                program.option(option.name, option.description, option.defaultValue);
            }
            await _.over( _.values(this.$events.before) )( program );
            await program.parse(argv);
            await _.over( _.values(this.$events.after) )( program );
            return program;
        },
    };
};


Command.exec = async (name, ...tags)=>(commands[name]||{exec:()=>null}).exec(...tags);
Command.find = (executer)=>_.values(commands).find(executer);
Command.help = function(dd=false){
    const logger = require('../Logger');
    const Table = require('cli-table');
    const table = new Table();
    table.push(..._.values( commands ).map(e=>({[e.props.name]:e.props.usage})));
    if(!dd) return table;
    logger.log("\nAurora CLI".green ,"para servidores construídos en NodeJS.\n");
    logger.warn("Usage:");
    logger.log(`  help [command]\n`);
    logger.warn(`Options (default):`);
    logger.log("-h, --help     display this content");
    logger.warn(`\nAvailable commands:`);
    logger.log( table.toString() );
};

module.exports = Command;