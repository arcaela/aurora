declare global {
    namespace Aurora {
        export class Provider {
            async boot() : Promise<any>
        }
    }
}
const Provider : Aurora.Provider;
export = Provider;