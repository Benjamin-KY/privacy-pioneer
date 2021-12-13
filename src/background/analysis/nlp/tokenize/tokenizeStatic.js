import { tokenMapping } from "./tokenizeContext.js"

const stoneData = {
    "latitude": 41.55231162804158,
    "longitude": 72.65694405796363,
    "zipCode": /[^0-9]06457[^0-9]/,
    "streetAddress": /71 lawn ave/i,
    "city": /Middletown/i,
    "state": /Connecticut/i,
    "ipAddress": /73\D?238\D?148\D?75/
}

const floatRegex = /\D\d{2}\.\d{1,20}/g

// helper function from searchFunctions.js
function cleanMatch(match) {
    var cleaned = []
    let i = 0
    while ( i < match.length ) {
      const char = match[i]
      if ( (char >= '0' && char <= '9') || char == '\.' ) {
        cleaned.push(char)
      }
      i += 1
    }
    return parseFloat(cleaned.join(''));
}

/**
 * @param {string} txt txt we are working with  
 * @returns {string} txt but with instances of lat/lng replaced by tokens
 */
function tokenizeCoors(txt) {

  const matches = txt.matchAll(floatRegex)
  const matchArr = Array.from(matches)

    for (const match of matchArr) {
      const stIdx = match.index + 1
      const endIdx = stIdx + match[0].length - 1
      const asFloat = cleanMatch(match[0])
      let deltaLat = Math.abs(asFloat - stoneData["latitude"])
      let deltaLng = Math.abs(asFloat - stoneData["longitude"])

      if (deltaLat < 1) {
          txt = txt.substring(0, stIdx) + tokenMapping["latitude"] + txt.substring(endIdx)
      }
      if (deltaLng < 1) {
          txt = txt.substring(0, stIdx) + tokenMapping["longitude"] + txt.substring(endIdx)
      }
    }

    return txt
}

/**
 * 
 * @param {string} txt
 * @returns {string} txt but with instances of data replaced by tokens 
 */
function tokenizeSimple(txt) {
    for (const [typ, re] of Object.entries(stoneData)) {
        if (re instanceof RegExp) {
            txt = txt.replace(re, tokenMapping[typ])
        }
    }
    return txt
}

/**
 * 
 * @param {string} txt 
 * @returns {string} txt but with instances of data replaced by tokens
 */
function tokenizeText(txt) {
    return tokenizeCoors(tokenizeSimple(txt))
}

/**
 * @param {string} strReq
 * @param {Array<int>} idxArr 
 * @returns {string}
 */
function getContextAndTokenize(strReq, idxArr) {

    var [stIdx, endIdx] = idxArr

    const left = stIdx > 100 ? stIdx - 100 : 0
    const right = endIdx + 100 < strReq.length ? endIdx + 100 : strReq.length

    return tokenizeText(strReq.substring(left, right))
}

export { getContextAndTokenize }