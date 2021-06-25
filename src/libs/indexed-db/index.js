import { openDB } from "idb";
import { evidenceKeyval as evidenceIDB } from "../../background/analysis/openDB";
import {
  keywordTypes,
  permissionEnum,
  privacyLabels,
} from "../../background/analysis/classModels";

/**
 * Create/open indexed-db to store keywords for watchlist
 */
const dbPromise = openDB("watchlist-store", 1, {
  upgrade(db) {
    db.createObjectStore("watchlist");
  },
});

/**
 * Wrapper functions for CRUD operations of 'watchlist' indexed-db
 */
export const watchlistKeyval = {
  async get(key) {
    return (await dbPromise).get("watchlist", key);
  },
  async set(key, val) {
    return (await dbPromise).put("watchlist", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("watchlist", key);
  },
  async clear() {
    return (await dbPromise).clear("watchlist");
  },
  async keys() {
    return (await dbPromise).getAllKeys("watchlist");
  },
  async values() {
    return (await dbPromise).getAll("watchlist");
  },
};

/**
 * Utility function to create hash for watchlist key based on keyword and type
 * This will overwrite keywords in the watchlist store that have the same keyword and type
 * Which is okay
 * from: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
const hash = (str) => {
  var hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

/**
 * Saves/updates keyword from wathlist store
 * Updates keyword when 'id' is not undefined
 * Return true if successful, false otherwise
 */
export const saveKeyword = async (keyword, type, id) => {
  // Validate
  if (type in keywordTypes && keyword) {
    let key;
    if (id != null) {
      key = id;
    } else {
      key = hash(type.concat(keyword)).toString();
    }
    type != permissionEnum.location
      ? await watchlistKeyval.set(key, {
          keyword: keyword,
          type: type,
          id: key,
        })
      : await watchlistKeyval.set(key, {
          location: keyword,
          type: type,
          id: key,
        });
    return true;
  }
  return false;
};

/**
 * Deletes keyword from watchlist store
 */
export const deleteKeyword = async (id) => {
  await watchlistKeyval.delete(id);
};

/**
 * Get identified labels of website from indexedDB
 * Restucture to display in UI
 * result: {..., label: {..., requestURL: {..., labelType: requestObject}}}
 */
export const getWebsiteLabels = async (website) => {
  try {
    var evidence = await evidenceIDB.get(website, true); // website evidence from indexedDB
    if (evidence == undefined) { evidence = await evidenceIDB.get(website, false);}
    const result = {};
    for (const [label, value] of Object.entries(evidence)) {
      for (const [type, requests] of Object.entries(value)) {
        for (const [url, e] of Object.entries(requests)) {
          // Verify label and type are in privacyLabels
          if (label in privacyLabels && type in privacyLabels[label]["types"]) {
            // Add label in data to object
            if (!(label in result)) {
              result[label] = { [url]: { [type]: e } };
            } else if (!(url in result[label])) {
              result[label][url] = { [type]: e };
            } else {
              result[label][url][type] = e;
            }
          }
        }
      }
    }
    return result;
  } catch (error) {
    return {};
  }
};

/**
 * Get identified labels of all websites in an array from indexedDB
 * result: {..., website: {...,label: {..., requestURL: {..., labelType: requestObject}}}}
 */

export const getAllWebsiteLabels = async (websites) => {
  let weblabels = {};
  try {
    Object.keys(websites).forEach((website) => {
      getWebsiteLabels(website).then((res) => (weblabels[website] = res));
    });
    return weblabels;
  } catch (error) {
    return weblabels;
  }
};

/**
 * Uses above function to iterate through websites
 * Made for UI implementation
 * result: {label : number of websites that uses label }
 */

export const getLabels = async (websites) => {
  let labels = {};
  try {
    for (const website of Object.keys(websites)) {
      await getWebsiteLabels(website).then((res) => {
        Object.keys(res).forEach((label) => {
          Object.keys(labels).includes(label)
            ? (labels[label] += getNumOfWebsites(res[label]))
            : (labels[label] = getNumOfWebsites(res[label]));
        });
      });
    }
    return labels;
  } catch (error) {
    return labels;
  }
};

const getNumOfWebsites = (label) => Object.keys(label).length;


/**
 * Builds up dictionary of labels
 * 
 * @param {Bool} fP First party
 * @param {Dict} res Resulting dictionary
 * @returns Void
 */
const buildLabels = async (fP, res) => {
  try {
    const websites = await evidenceIDB.keys(fP);
    for (const website of websites) {
      const evidence = await evidenceIDB.get(website, fP); // website evidence from indexedDB
      const labels = Object.keys(evidence).filter(
        (label) => label in privacyLabels
      ); // verify label in privacy labels
      if (labels.length) res[website] = labels;
    }
  }
  catch (error) {
    return {}
  }
}

/**
 * Get all identified websites and thier labels from indexedDB
 * Restucture to display in UI
 * result: {..., websiteURL: [..., label]}
 */
export const getWebsites = async () => {
  try {
    const result = {};

    await buildLabels(true, result); // first party labels
    await buildLabels(false, result); // third party labels

    return result;

  } catch (error) {
    return {};
  }
};
