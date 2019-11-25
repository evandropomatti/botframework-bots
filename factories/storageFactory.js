const { MemoryStorage } = require('botbuilder');
const { BlobStorage } = require('botbuilder-azure');

class StorageFactory {

    getStorage = () => {
        const type = process.env.STORAGE_TYPE
        if (type === 'MEMORY') {

            return new MemoryStorage();

        } else if (type === 'STORAGE') {

            var options = {
                containerName: 'messages',
                storageAccountOrConnectionString: process.env.STORAGE_CONNECTION_STRING,
            };
            return new BlobStorage(options);
        } else if (type === 'COSMOS') {
            // TODO
        }
    }

}

module.exports = { StorageFactory }