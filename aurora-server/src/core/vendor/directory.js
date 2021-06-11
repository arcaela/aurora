const fs = require('fs');
const path = require('path');
module.exports = (...paths)=>{
    paths = paths.map(e=>(e&&typeof e==='object'&&e.dirname&&e.basename&&e.filename&&e.path)||e)
    const basepath = path.join(...paths); 
    return fs.readdirSync( basepath ).map(name=>{
        const fullpath = path.resolve( basepath, name);
        const stats = fs.lstatSync( fullpath );
        return {
            isFile:stats.isFile(),
            isDir:stats.isDirectory(),
            path:fullpath,
            dirname:path.dirname( fullpath ),
            basename:path.basename( fullpath ),
            filename:path.basename( fullpath ).replace(/(\w+)(\.[a-zA-Z0-9]+)$/gi,"$1"),
        };
    });
};

module.exports.imports = (...modules)=>{
    return module.exports(...modules).reduce((paths, file)=>({
        ...paths,
        ...(file.isFile?{[file.path]: require(file.path)}:{}),
        ...(file.isDir?module.exports.imports(file.path):{}),
    }), {});
};

module.exports.copyDirSync = function(srcDir, dstDir) {
    let results = [],
        list = fs.readdirSync(srcDir),
        src, dst;
    if( ! fs.existsSync(dstDir) )
        fs.mkdirSync(dstDir);
    list.forEach(function(file) {
        src = srcDir + '/' + file;
		dst = dstDir + '/' + file;
        let stat = fs.statSync(src);
        if (stat && stat.isDirectory()) {
            console.log('creating dir: ' + dst);
            fs.mkdirSync(dst);
            results = results.concat(this.copyDirSync(src, dst));
		} else {
            fs.writeFileSync(dst, fs.readFileSync(src));
			results.push(src);
		}
    });
    return results;
}