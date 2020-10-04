import Vue from 'vue';

const DB_NAME = 'treeManagerDB';
const DB_VERSION = 1;
let DB;

Vue.prototype.$indexedDB = {

  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) { return resolve(DB); }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        reject('Error');
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        console.log('onupgradeneeded');
        const db = e.target.result;
        db.createObjectStore('user', { autoIncrement: true });
      };
    });
  },
  async deleteUser() {
    const db = await this.getDb();

    return new Promise((resolve) => {
      const trans = db.transaction(['user'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore('user');
      store.delete('0');
    });
  },
  async getUser() {
    const db = await this.getDb();

    return new Promise((resolve) => {
      const trans = db.transaction(['user'], 'readonly');
      const user = [];

      trans.oncomplete = () => {
        resolve(user);
      };

      const store = trans.objectStore('user');

      store.get('0').onsuccess = (e) => {
        const userEntry = e.target.result;
        if (userEntry) {
          user.push(userEntry.value);
        }
      };
    });
  },

  async saveUser(user) {
    await this.deleteUser();
    const db = await this.getDb();

    return new Promise((resolve) => {
      const trans = db.transaction(['user'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore('user');
      store.put(user);
    });
  },

};
