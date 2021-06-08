/*
requestModel.js
================================================================================
- requestModel.js defines a structure of a network request
*/

import { openDB } from 'idb';

const dbPromise = openDB('keyval-store', 1, {
  upgrade(db) {
    db.createObjectStore('network-requests');
  },
});

// Wrapper functions for CRUD operations of 'EvidenceKeyval' indexed-db
// imported in src/libs/indexed-db/index.js to be displayed in the frontend
export const EvidenceKeyval = {
  async get(key) {
    return (await dbPromise).get('network-requests', key);
  },
  async set(key, val) {
    return (await dbPromise).put('network-requests', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('network-requests', key);
  },
  async clear() {
    return (await dbPromise).clear('network-requests');
  },
  async keys() {
    return (await dbPromise).getAllKeys('network-requests');
  },
  async values() {
    return (await dbPromise).getAll('network-requests')
  },
};
