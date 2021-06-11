const { Aliasses, PackageJSON, Kernel } = require('../index');
Aliasses.merge(PackageJSON['PSR-4'], Kernel.aliasses, {
    '~':aurora.paths.src(),
});