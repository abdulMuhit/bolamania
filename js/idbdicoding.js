const dbPromise = idb.openDb('bolamania', 1, (upgradeDB) => {
    if (!upgradeDB.objectStoreNames.contains('watch')) {
        const item = upgradeDB.createObjectStore('watch');
        item.createIndex('idx', 'idx', { autoIncrement: true, unique: false });
    }
});

function addData(val, key){

    return new Promise((resolve, reject) => {
        dbPromise.then((db) => {
            const tx = db.transaction('watch', 'readwrite');
            tx.objectStore('watch').put(val, key);
            return tx.complete
        }).then(() => {
            resolve(true)
        }).catch(() => {
            reject(false);
        });
    })
}

function getOne(key){
    return new Promise((resolve, reject) => {
        dbPromise.then(db => db.transaction('watch')
            .objectStore('watch')
            .get(key))
            .then((obj) => {
                resolve(obj)
            }).catch(e=>{
            reject(e);
        });
    })
}

function getAllDataBookmarked(){
    return new Promise((resolve, reject) => {
        dbPromise.then(db => db.transaction('watch')
            .objectStore('watch')
            .getAll()
            .then((objects) => {
              resolve(objects)
            }).catch(e=>{
            console.log("error ", e);
            reject(e)
        }))
    });

}

function deleteKey(key) {
    return new Promise((resolve, reject) => {
        dbPromise.then((db) => {
            const tx = db.transaction('watch', 'readwrite')
            const store = tx.objectStore('watch')
            store.delete(key);
            return tx.complete
        }).then((x) => {
            resolve(true)
        }).catch(e=>{
            reject(false)
        });
    })
}

function clearDb() {
    return new Promise((resolve, reject) => {
        dbPromise.then((db) => {
            const tx = db.transaction('watch', 'readwrite')
            const store = tx.objectStore('watch')
            store.clear();
            return tx.complete
        }).then((x) => {
            resolve(true)
        }).catch(e=>{
            reject(false)
        });
    })

}
