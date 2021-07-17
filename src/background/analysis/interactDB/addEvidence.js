import { getHostname } from "../utility/util.js"
import { evidenceKeyval } from "../interactDB/openDB.js"
import { Evidence, typeEnum, storeEnum } from "../classModels.js"


/**
 *
 * @param {string} perm The permission of this piece of evidence
 * @param {string} rootU The rootUrl of the request
 * @param {string} snip The request as a string
 * @param {string} requestU The requestUrl of the request
 * @param {string} t The type of the evidence
 * @param {Array|undefined} i The index (where in the request string) of the evidence (Either an array or length 2 or undefined)
 * @returns {Promise} Nothing. The evidence DB is updated.
 *
 * addToEvidenceList is the function that is called to populate the DB with a piece of evidence. Called by the functions in
 * searchFuncitons.js. The function is async because it makes calls to the DB and the browser history. Pieces of evidence are stored as
 * Evidence objects. These objects are stored at keys of their rootUrl. At each rootUrl, there is a dictionary with a permission level
 * (defined in permissionEnum) and then a further type level (defined in typeEnum). We store only one piece of evidence per permssion/type for a
 * given rootUrl and a maximum of 5 pieces of evidence in total for a permission/type.
 */

// perm, rootU, snip, requestU, t, i, extraDetail = undefined)
async function addToEvidenceStore(evidenceToAdd, firstParty, parent, rootU, requestU) {

  /**
   * This is a known bug where certain websites intiate requests where the rootURL 
   * is undefined. rootURL comes from request.details["originUrl"] which is a property 
   * of the onBeforeRequest callback:
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#details
   * In this case, we do not add evidence and return.
   */
  if (rootU == undefined) { return new Promise( function(resolve, reject) {
    resolve('undefined rootU');
  }) }; 

  const ts = Date.now()
  const rootUrl = getHostname(rootU)
  const store = firstParty ? storeEnum.firstParty : storeEnum.thirdParty

  var evidence = await evidenceKeyval.get(rootUrl, store)
  if (evidence === undefined) { evidence = {} }

  function unpackAndUpdate(evidenceListObject) {
    // unpack the list we are passed
    let perm, rootU, snip, requestU, t, i, extraDetail
    if (evidenceListObject.length == 6) {
      [perm, rootU, snip, requestU, t, i] = evidenceListObject
      extraDetail = undefined
    }
    else { [perm, rootU, snip, requestU, t, i, extraDetail] = evidenceListObject}

    rootU = rootUrl
  
    // whitelist our IP API
    if (requestU == 'http://ip-api.com/json/'){ return new Promise( function(resolve, reject) {
      resolve('whitelist IP API');
    }) };
  
    const e = new Evidence( {
      timestamp: ts,
      permission: perm,
      rootUrl: rootUrl,
      snippet: snip,
      requestUrl: requestU,
      typ: t,
      index: i,
      firstPartyRoot: firstParty,
      parentCompany: parent,
      extraDetail: extraDetail
    } )
  
    evidence = updateFetchedDict(evidence, e)
  }

  // update the fetched evidence dict with each piece of evidence we have for this request
  for ( const evidenceList of evidenceToAdd) {
    unpackAndUpdate(evidenceList)
    }

  //final return statement
  return new Promise( function(resolve, reject) {
    evidenceKeyval.set(rootUrl, evidence, store)
    resolve('set');
  });
}


/**
 * Function used to update an already fetched evidence dictionary with a piece of evidence, e.
 * 
 * @param {Dict} evidenceDict The dictionary we are updating 
 * @param {Evidence} e An evidence object
 * @returns {Dict} The param evidenceDict, but updated with Evidence, e, appropriately
 */
function updateFetchedDict(evidenceDict, e) {
    
    /**
    * Used to push evidence through (override evidence cap of 4 per type)
    * that will create multiple labels for one request URL
    *
    * @param {Object} currDict object with the dexisting evidence for a permission
    * @param {string} typ the type that we're currently trying to add
    * @returns {Set} The urls that already have evidence within this permission
    */
   function getReqUrlsWithDifferentTypes(currDict, typ) {

    var reqUrlSet = new Set()

    for ( const [type, reqUrlObject] of Object.entries(currDict) ) {
      for ( const reqUrl of Object.keys(reqUrlObject)) {
        if (typ != type) { reqUrlSet.add(reqUrl) }
      }
    }
    return reqUrlSet
  }

  // vars from the evidence object we are adding
  var evidence = evidenceDict
  const reqUrl = getHostname(e.requestUrl)
  const perm = e.permission
  const t = e.typ

  // if we have this rootUrl in evidence already we check if we already have store_label
  if (Object.keys(evidence).length !== 0) {
    if (perm in evidence) {
      var pushThrough = false
      let reqUrlSet = getReqUrlsWithDifferentTypes(evidence[perm], t)
      if (reqUrlSet.has(reqUrl)) { pushThrough = true; }

      // if type is in the permission
      if (t in evidence[perm]) {
        let hardNo = reqUrl in evidence[perm][t];
        let belowEvidenceCap = (Object.keys(evidence[perm][t]).length < 5)
        // if we have less than 5 different reqUrl's for this permission and this is a unique reqUrl, we save the evidence
        if ( (pushThrough || (belowEvidenceCap)) && !hardNo) {
          evidence[perm][t][reqUrl] = e
        }
        else { return evidence }
      }
      else { // we don't have this type yet, so we initialize it
        evidence[perm][t] = {}
        evidence[perm][t][reqUrl] = e
      }
    }
    else { // we don't have this permission yet so we initialize
      evidence[perm] = {}

      // init dict for permission type pair
      evidence[perm][t] = {}

      evidence[perm][t][reqUrl] = e
    }
  }
  // we have don't have this rootUrl yet. So we init evidence at this url
  else {
    evidence[perm] = {}
    evidence[perm][t] = {}
    evidence[perm][t][reqUrl] = e
  }
  return evidence
}

export { addToEvidenceStore }
