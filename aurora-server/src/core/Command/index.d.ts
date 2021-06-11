import Table from "cli-table";
import * as commander from "commander"



declare global {

    namespace Aurora {
        declare namespace Console {
            export type Props = {
                name : string,
                action(options:{[key]:string}) : any,
                usage : String ,
                version : string,
                arguments? : string,
                options : {
                    name:'-e,--example <exampleName>',
                    description:string,
                    macros?:{ tag:'--example2', value:string | boolean | number }[],
                    defaultValue:string | boolean | number,
                }[],
                allowUnknownOption : true | false,
            }
            export type Command = {
                props : Props,
                $events:{
                    before:{ [key:string] : Function },
                    after:{ [key:string] : Function },
                },
                before(executer : ()=>{} ) : Function,
                after(executer : ()=>{} ) : Function,
                exec(...argv : string[] | [][]) : Promise<commander.Command>,
            }

        }
    }
}

const Console = (name: string, props: Aurora.Console.Props) : Aurora.Console.Command => {};
Console.exec = async (name : String, ...argv : string[] | [][]) : Promise<commander.Command> => {};
Console.find = (iterator : (command : any)=>{}) : Aurora.Console.Command =>{};
Console.help = <T extends boolean>(dd : T | false): T extends true ? undefined : Table => {};


export = Console;