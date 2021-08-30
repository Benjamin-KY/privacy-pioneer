/*
Licensed per https://github.com/privacy-tech-lab/privacy-pioneer/blob/main/LICENSE
privacy-tech-lab, https://www.privacytechlab.org/
*/

import { watchlistKeyval } from "./openDB.js";
import { evidenceKeyval as evidenceIDB } from "../../background/analysis/interactDB/openDB.js";
import { watchlistHashGen } from "../../background/analysis/utility/util.js";
import { getState } from "../../background/analysis/buildUserData/structuredRoutines.js";
import { keywordTypes, permissionEnum, storeEnum, typeEnum } from "../../background/analysis/classModels.js";


/**
 * Saves/updates keyword from watchlist store
 * Updates keyword when 'id' is not undefined
 * 
 * @param {keyword}
 * @param {type}
 * @param {id}
 * @returns {Boolean} True if successful, false otherwise
 */
 const saveKeyword = async (keyword, type, id) => {
    // Validate
    if (type in keywordTypes && keyword) {
      let key
      if (id != null) {
        key = id
      } else if (type == permissionEnum.location) {
        let watchlist = await watchlistKeyval.values()
        var maxNum = 0
        watchlist.forEach((el) => {
          if (el.type == permissionEnum.location) {
            maxNum = Math.max(maxNum, el.locNum)
          }
        })
        maxNum = (maxNum + 1).toString()
        key = watchlistHashGen(type, maxNum)
      } else {
        key = watchlistHashGen(type, keyword)
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
            locNum: maxNum,
          })
      return true
    }
    return false
  }
  
  /**
  * Deletes the keyword from the watchlist.
  * Deletes the evidence associated with that keyword from the evidenceDB
  * 
  * @param {number} id 
  * @param {string} type 
  * @returns {void} Nothing. Updates and deletes as described.
  */
  const deleteKeyword = async (id) => {
    let firstEvKeys = await evidenceIDB.keys(storeEnum.firstParty)
    let thirdEvKeys = await evidenceIDB.keys(storeEnum.thirdParty)
  
    /**
     * Deletes evidence if watchlistHash of the evidence is the same as the id we are deleting from the watchlist
     * @param {Object} evidenceStoreKeys All keys from the related store, taken from the above lines
     * @param {String} store Store name from storeEnum
     */
    function runDeletion(evidenceStoreKeys, store) {
      evidenceStoreKeys.forEach(async (website) => {
        let a = await evidenceIDB.get(website, store)
        if (a == undefined) {
          return
        } // shouldn't happen but just in case
        for (const [perm, typeLevel] of Object.entries(a)) {
          for (const [type, evUrls] of Object.entries(typeLevel)) {
            for (const [evUrl, evidence] of Object.entries(evUrls)) {
              if (id == evidence.watchlistHash) {
                delete a[perm][type][evUrl]
              }
            }
            if (Object.keys(a[perm][type]).length == 0) {
              delete a[perm][type]
            }
          }
          if (Object.keys(a[perm]).length == 0) {
            delete a[perm]
          }
        }
        await evidenceIDB.set(website, a, store)
      })
    }
  
    // delete from Evidence
    runDeletion(firstEvKeys, storeEnum.firstParty)
    runDeletion(thirdEvKeys, storeEnum.thirdParty)
  
    // delete from watchlist
    await watchlistKeyval.delete(id)
  }

export { saveKeyword, deleteKeyword }