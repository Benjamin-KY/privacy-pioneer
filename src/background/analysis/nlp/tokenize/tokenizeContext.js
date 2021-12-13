/*
Licensed per https://github.com/privacy-tech-lab/privacy-pioneer/blob/main/LICENSE
privacy-tech-lab, https://www.privacytechlab.org/
*/


// Create mapping from data types to their token
const tokenMapping = {
    "latitude": "<TARGET-LAT>",
    "longitude": "<TARGET-LNG>",
    "zipCode": "<TARGET-ZIP",
    "streetAddress": "<TARGET-ADDR>",
    "city": "<TARGET-CITY>",
    "state": "<TARGET-STATE>",
    "ipAddress": "<TARGET-IP>"
}


function tokenizeContext(strContext, tokenType, indices) {

    //unpack indexes
    const [stIdx, endIdx] = indices
    const strLen = strContext.length 
    // get appropriate token from mapping
    const token = tokenMapping[tokenType]

    // get the 100 characters before the token (if possible)
    const beginContext = stIdx > 100 ? strContext.substring(stIdx - 100, stIdx) : strContext.substring(0, stIdx)
    // get the 100 characters after the token (if possible)
    const endContext = endIdx + 101 <= strLen ? strContext.substring(endIdx + 1, endIdx + 101) : strContext.substring(endIdx + 1, strLen)  

    // return pre-processed context
    return beginContext + token + endContext
}


/**
 * @param {string} strContext The context where evidence was found that needs to be tokenized
 * @param {string} tokenType The type of the evidence that we're wanting to 
 * @param {Array<int>} indices The start and end index for the keyword we found, passed as len 2 array 
 * @returns {boolean} True if the NLP model validates the finding, False if it rejects
 */
function validateContextNLP(strContext, tokenType, indices) {
    const preProcessedContext = tokenizeContext(strContext, tokenType, indices)
    console.log(preProcessedContext)
    return true
}

export { tokenizeContext, validateContextNLP }