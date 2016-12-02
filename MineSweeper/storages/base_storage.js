'use strict';
import Storage from 'react-native-storage';
let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 365,
    enableCache: true
});
global['__Storage'] = storage;
module.exports = storage;
