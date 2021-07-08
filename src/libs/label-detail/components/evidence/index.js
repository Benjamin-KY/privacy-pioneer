import React, { useEffect, useState } from "react"
import { privacyLabels } from "../../../../background/analysis/classModels"
import { SContainer, SHeader, SCollapse, SCodeBlock, SBody, SEvidenceDescription } from "./style"

/**
 * 'Collapse' containing evidence/extra info about identified label type
 */
const Evidence = ({ collapseId, request, label, type }) => {
  /**
   * Check if value is int
   */
  const isInt = (value) => {
    var x
    if (isNaN(value)) {
      return false
    }
    x = parseFloat(value)
    return (x | 0) === x
  }

  /**
   * Get the identified evidence code snippet
   */
  const getSnippet = (request) => {
    if (
      request != null &&
      request.snippet != null &&
      request.index !== -1 &&
      isInt(request.index[0]) &&
      isInt(request.index[1])
    ) {
      const maxChars = 475
      const data = { leading: "", middle: "", trailing: "" }
      data.middle = request.snippet.slice(request.index[0], request.index[1])

      data.leading = request.snippet.slice(0, request.index[0])
      data.trailing = request.snippet.slice(request.index[1], request.snippet.length)

      data.leading = "... " + data.leading.slice(maxChars * -1)
      data.trailing = data.trailing.slice(0, maxChars) + " ..."

      return data
    } else {
      return null
    }
  }

  /**
   * Get sub label general description
   */
  const getGeneralDescription = (request) => {
    if (request != null) {
      const generalDescription = privacyLabels[label]["types"][type]["description"]
      if (generalDescription.length) {
        return "➜ ".concat(generalDescription);
      } else {
        return ""
      }
    }
    return ""
  }

  const [handEmoji, setHandEmoji] = useState('');

  useEffect(() => {
    let choice = pickPointDownEmoji();
    setHandEmoji(choice);
  }, []);

  /**
   * return a random hand from choice of all hands
   * @returns {string}
   */
  const pickPointDownEmoji = () => {
    const allHands = [`👇`, `👇🏽`, `👇🏼`, `👇🏿`, `👇🏻`, `👇🏾`];
    return allHands[Math.floor(Math.random()*allHands.length)];
  }

  /**
   * Get sub label specific description
   */
  const getSpecificDescription = (request) => {
    if (request != null) {
      let specificDescription = {leading: "", highlight: "", trailing: "", signOff: ""}
      const displayType = privacyLabels[label]["types"][type]["displayName"];

      // description for when evidence came from a list of URL's (disconnect or urlClassification header)
      if (request.index == -1) {
        specificDescription.leading = `➜ The URL that initiated this HTTP request is known to practice `;
        specificDescription.highlight = `${displayType}`;
        specificDescription.trailing = `.`;
        specificDescription.signOff = "";
      }
      // description for when the evidence came with an index in the strReq
      // (this could mean body but could also be a requeust URL that came up from one of the search routines)
      else {
        let keywordFlagged = request.snippet.slice(request.index[0], request.index[1]);
        // cut down the keyword if it's lengthy.
        if (keywordFlagged.length > 25) {
          let trailingPeriods = keywordFlagged.charAt(24) == `.` ? `..` : `...`; // to avoid ....
          keywordFlagged = keywordFlagged.slice(0,25).concat(trailingPeriods);
        }
        specificDescription.leading = `➜ We found`;
        specificDescription.highlight = ` ${keywordFlagged}`
        specificDescription.trailing =  ` in this HTTP request, so we gave it the ${displayType} label.`;
        specificDescription.signOff = `${handEmoji} Context below`;
      }
      return specificDescription
    }
    return ""
  }

  const specificDescription = getSpecificDescription(request);
  const generalDescription = getGeneralDescription(request);
  const data = getSnippet(request);

  return (
    <SCollapse className="collapse" id={collapseId}>
      <SContainer className="card card-body">
        <SHeader marginTop="16px">◉ Description</SHeader>
            <SEvidenceDescription>
              <pre>
              {generalDescription}
              <br></br>
              {specificDescription.leading}
              <span>{specificDescription.highlight}</span>
              {specificDescription.trailing}
              <br></br>
              <span>{specificDescription.signOff}</span>
              </pre>
            </SEvidenceDescription>
        <SHeader marginTop="16px">◉ Request URL </SHeader>
        <SBody>
          <pre>
            <code>{request != null ? request["requestUrl"] : ""}&nbsp;</code>
          </pre>
        </SBody>
        {data ?
          <div>
            <SHeader marginTop="16px" marginBottom="8px">
              ◉ Data Snippet
            </SHeader>
            <SCodeBlock>
              <pre>
                <code>
                  {data.leading}
                  <span>{data.middle}</span>
                  {data.trailing}
                </code>
              </pre>
            </SCodeBlock>
          </div> 
        : null} 
      </SContainer>
    </SCollapse>
  )
}
 
export default Evidence
