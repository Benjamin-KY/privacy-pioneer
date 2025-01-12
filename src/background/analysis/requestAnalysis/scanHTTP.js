/*
Licensed per https://github.com/privacy-tech-lab/privacy-pioneer/blob/main/LICENSE
privacy-tech-lab, https://www.privacytechlab.org/
*/

import { regexSearch, coordinateSearch, urlSearch, locationKeywordSearch, fingerprintSearch, ipSearch, pixelSearch, encodedEmailSearch, dynamicPixelSearch } from "./searchFunctions.js"
import { permissionEnum, typeEnum, resourceTypeEnum } from "../classModels.js"
import { lengthHeuristic } from "../requestAnalysis/earlyTermination/heuristics.js";


/**
 * This function runs all of the apporpriate analysis functions for an HTTP request.
 * It returns an empty array if no evidence is found. Else an array of arrays containing the
 * information to be added.
 * 
 * Defined in scanHTTP.js
 * 
 * Used in analyze.js
 * 
 * @param request An HTTP request to be analyzed
 * @param userData 
 */
function getAllEvidenceForRequest(request, userData) {

  const rootUrl = request.rootUrl
  const reqUrl = request.reqUrl

  // this 0, 1, 2 comes from the structure of the importData function
  // location we obtained from google maps API
  const loc = userData[0]
  // {phone #s, emails, location elements entered by the user, fingerprinting keywords}
  const networkKeywords = userData[1]
  // websites that have identification objectives
  const urls = userData[2]

  const optimizePerformance = userData[4]

  // We only perform our analysis on reqUrl, requestBody, and responseData.
  const strRequest = JSON.stringify(request, 
      ["reqUrl",
      "requestBody",
      "responseData"]
    );

  var evidenceArr = []


  // we don't surface these evidences, so skip.
  if (typeof rootUrl == "undefined") {
    return evidenceArr
  }

  /**
   * We call this function to appropriately build the result list from our search functions.
   * We don't add non-findings, and we unpack multi-findings
   * 
   * Defined, used in scanHTTP.js
   * 
   * @param {Array<Array>} resArr The search function result 
   * @param {Array} arr The array of results we are building for this HTTP request 
   * @returns {Void} Updates the array of evidence, defined outside of this function
  */
  function executeAndPush(resArr, arr = evidenceArr) {
    if (typeof resArr == 'undefined') {return}
    if (resArr.length == 0) {return}
    for (const evList of resArr) {
      evList.cookie = false
      arr.push(evList); // push the evidence to the arr
    }
  }

  executeAndPush(urlSearch(rootUrl, reqUrl, request.urlClassification))


  function earlyTermination() {
    return lengthHeuristic(strRequest)
  }

  if (optimizePerformance) {
    if (earlyTermination()) {
      return evidenceArr
    }
  }

  runWatchlistAnalysis()
  runStandardAnalysis()

  return evidenceArr

  /**
   * Function to call watchlist search functions.
   * @returns {Void} Nothing. Updates evidenceArr as necessary
   */
  function runWatchlistAnalysis() {

    if (!permissionEnum.watchlist in networkKeywords) { 
      return
    }

    const watchlistDict = networkKeywords[permissionEnum.watchlist]

    if ( typeEnum.phoneNumber in watchlistDict ) {
      watchlistDict[typeEnum.phoneNumber].forEach( number => {
        executeAndPush(regexSearch(strRequest, number, rootUrl, reqUrl, typeEnum.phoneNumber))
      })
    }
    if ( typeEnum.emailAddress in watchlistDict ) {
        executeAndPush(encodedEmailSearch(strRequest, networkKeywords, rootUrl, reqUrl))
       
        watchlistDict[typeEnum.emailAddress].forEach( email => {
        executeAndPush(regexSearch(strRequest, email, rootUrl, reqUrl, typeEnum.emailAddress))
      })
    }

    if ( typeEnum.userKeyword in watchlistDict ) {
      watchlistDict[typeEnum.userKeyword].forEach ( keyword => {
        executeAndPush(regexSearch(strRequest, keyword, rootUrl, reqUrl, typeEnum.userKeyword))
      })
    }

    if ( typeEnum.ipAddress in watchlistDict ) {
      watchlistDict[typeEnum.ipAddress].forEach( ip => {
        executeAndPush(ipSearch(strRequest, ip, rootUrl, reqUrl))
      })
    }
  }

  /**
   * Function to call generalized search functions
   * @returns {Void} Nothing. Updates evidenceArr as necessary
   */
  function runStandardAnalysis() {

    // if the request is an image or subFrame and is coming from a different url than the root, we look for our pixel URLs
    if ( (request.type == resourceTypeEnum.image || request.type == resourceTypeEnum.subFrame) && rootUrl != reqUrl ) {
      executeAndPush(pixelSearch(strRequest, networkKeywords, rootUrl, reqUrl))
      executeAndPush(dynamicPixelSearch(strRequest, reqUrl, rootUrl))
      // only do pixel analysis for images.
      if ( request.type == resourceTypeEnum.image) {
        return 
      }
    }

    // if this value is 0 the client likely denied location permission
    // or they could be on Null Island in the middle of the Gulf of Guinea
    if (loc[0] != 0 && loc[1] != 0) {
      executeAndPush(coordinateSearch(strRequest, loc, rootUrl, reqUrl))
    }
    // search for location data if we have it
    if ( permissionEnum.location in networkKeywords) {
      executeAndPush(locationKeywordSearch(strRequest, networkKeywords[permissionEnum.location], rootUrl, reqUrl))
    }

    // search to see if any fingerprint data
    executeAndPush(fingerprintSearch(strRequest, networkKeywords, rootUrl, reqUrl))
  }
}

export { getAllEvidenceForRequest }


