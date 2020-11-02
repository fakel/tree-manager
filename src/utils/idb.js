import Dexie from 'dexie';

const db = new Dexie('pendingUpload');

db.version(1).stores({
  treeInfo: 'id',
});

export default {
  db,
  deleteEntry(objStore, id) {
    return new Promise((resolve) => {
      const trans = db.transaction([objStore], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore(id);
      store.delete('0');
    });
  },
  getEntry(objStore, id) {
    // console.log(objStore, id);
    return db[objStore].get(id);
  },
  getAllEntries(objStore) {
    return new Promise((resolve) => {
      const trans = db.transaction([objStore], 'readonly');
      const entries = [];

      trans.oncomplete = () => {
        resolve(entries);
      };

      const store = trans.objectStore(objStore);

      store.openCursor().onsuccess = (e) => {
        const entry = e.target.result;
        if (entry) {
          entries.push(entry.value);
        }
      };
    });
  },
  saveEntry(objStore, entry) {
    return db[objStore].update(entry.id, entry).then(() => db[objStore].get(entry.id));
  },
};
