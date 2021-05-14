const path = require('path');
const commander = require('commander');


exports.CLI = (config={})=>{
    config = {
        // name:'aurora',
        // arguments:'<command> [tags]',
        options:[],
        allowUnknownOption:true,
        version:'Aurora Version: 1.0.0',
        usage:'Aurora CLI para servidores construídos con NodeJS.',
        ...config
    };
    const program = new commander.Command();
    if (config.version) program.version(config.version)
    if (config.name) program.name(config.name)
    if (config.usage) program.usage(config.usage)
    if (config.arguments) program.arguments(config.arguments)
    if (config.allowUnknownOption) program.allowUnknownOption()
    if (config.action) program.action(config.action)
    for(let option of config.options){
        const params = process.argv.slice(2);
        (option.macros||[]).forEach(macro=>(option.defaultValue=params.includes(macro.tag)?macro.value:option.defaultValue));
        program.option(option.name, option.description, option.defaultValue);
    }
    return program.parse(process.argv);
};


exports.require = (root='')=>{
    if(root.match(/^\~\/(.*)/))
        root=path.resolve(__dirname,`../`,root.replace(/^\~\//, ''))
    return require(root);
};