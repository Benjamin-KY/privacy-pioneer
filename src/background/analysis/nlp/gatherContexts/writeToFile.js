// skeleton for exporting the data created in tokenizeStatic.js

function createBlob(txt) {
    return new Blob(txt, {type: "text/plain"})
}

/**
 * 
 */
function initiateNLPContextDownload(contextArr) {

    const blob = createBlob(contextArr.join(""))
    const dataURL = URL.createObjectURL(blob)
    var downloading = browser.downloads.download({
        url: downloadURL,
        filename: `nlp_context.txt`,
    })
}
