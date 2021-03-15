import Snapshot from './Snapshot'
export default function AuroraDB(props={}, success=null){
    const options = {
        name:null,
        onBlocked:null,
        persistence:false,
        success:success||(()=>{}),
        error(){},
        onUpgrade(){},
        onConnect(){},
        getData:snap=>snap.val(),
        filterData:Boolean,
        ...(typeof props==='string'?{name:props}:props),
    };
    return new Promise((Resolved, Failed)=>{
        const Server = window.indexedDB.open('AuroraDB@server', 7);
        Server.onblocked = (event)=>Failed(['connection_blocked', event]);
        Server.onerror = (event)=>Failed(['connection_failed', event]);
        Server.onupgradeneeded =  (event)=>{
            const _database = event.target.result;
            if(!_database.objectStoreNames.contains('AuroraDB@buckets'))
                _database.createObjectStore('AuroraDB@buckets',{keyPath:'name',unique:true});
            options.onUpgrade(_database, event);
        };
        Server.onsuccess = event=>{
            const $connection = event.target.result,
                Stores = $connection.transaction(['AuroraDB@buckets'], 'readwrite').objectStore('AuroraDB@buckets'),
                Bucket = Stores.get(options.name);
            Bucket.onerror = event=>Failed(['snapshot_get',event]);
            Bucket.onsuccess = async ({target})=>{
                const Snap = new Snapshot(options.name, target.result?target.result.data:{});
                options.onConnect($connection);
                await options.success(Snap, $connection);
                const data = await options.getData(Snap);
                if(options.filterData(data)){
                    const Put = Stores.put({data, name:options.name});
                    Put.onsuccess=()=>Resolved($connection);
                    Put.onerror=(event)=>Failed(['snapshot_put', event]);
                }else Resolved($connection);
            };
        };
    })
    .then(connect=>((!options.persistence)?connect.close():connect))
    .catch(([message, event])=>{
        switch (message) {
            case 'connection_blocked':
                if(options.onBlocked) options.onBlocked(event);
                else options.error(message, event);
            break;
            default:
                options.error(message, event);
            break;
        }
    });
}