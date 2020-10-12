const DB_NAME = 'pendignUpload';
const DB_VERSION = 1;
let DB;

export default {
  async getDb(objStore) {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        reject(`Error ${e}`);
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        console.log('onupgradeneeded');
        const db = e.target.result;
        db.createObjectStore(objStore, {
          autoIncrement: false,
          keyPath: 'id',
        });
      };
    });
  },
  async deleteEntry(objStore, id) {
    const db = await this.getDb(objStore);

    return new Promise((resolve) => {
      const trans = db.transaction([objStore], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore(id);
      store.delete('0');
    });
  },
  async getEntry(objStore, id) {
    const db = await this.getDb(objStore);

    return new Promise((resolve) => {
      const trans = db.transaction([objStore], 'readonly');
      let entry;

      trans.oncomplete = () => {
        resolve(entry);
      };

      const store = trans.objectStore(objStore);

      store.get(id).onsuccess = (e) => {
        entry = e.target.result.value;
      };
    });
  },
  async getAllEntries(objStore) {
    const db = await this.getDb(objStore);

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
  async saveEntry(objStore, entry) {
    const db = await this.getDb(objStore);

    return new Promise((resolve) => {
      const trans = db.transaction([objStore], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      const store = trans.objectStore(objStore);
      store.put(entry);
    });
  },
};
