/*
requestModel.js
================================================================================
- requestModel.js defines a structure of a network request
*/

export class Request {
  constructor({ id, details, requestHeaders, responseHeaders, requestBody, responseData, error }) {
    this.id = id // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData#parameters
    this.requestHeaders = requestHeaders // https://developer.mozilla.org/en-US/docs/Glossary/Request_header
    this.responseHeaders = responseHeaders // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/HttpHeaders
    this.responseData = responseData // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/StreamFilter
    this.requestBody = requestBody // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#details
    this.details = details // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#details
    this.error = error // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/StreamFilter/onerror
  }
}

// class model for evidence type for when we find a keyword or URL
// we want index as an array [start, finish]
export class Evidence {
  constructor({ timestamp, permission, rootUrl, snippet, requestUrl, typ, index }) {
    this.timestamp = timestamp
    this.permission = permission
    this.rootUrl = rootUrl
    this.snippet = snippet
    this.requestUrl = requestUrl
    this.typ = typ
    this.index = index === undefined ? -1 : index
  }
}

export const permissionEnum = Object.freeze({
  Location: "location",
  PersonalData: "personalData",
  Fingerprinting: "Fingerprinting",
  Advertising: "Advertising",
  Content: "Content",
})

export const typeEnum = Object.freeze({
  CoarseLocation: "coarse_location",
  TightLocation: "tight_location",
  City: "City",
  State: "State",
  StreetAddress: "street_address",
  Social: "Social",
  IpAddress: "ip_address",
  UserKeyword: "UserKeyword",
  Analytics: "Analytics",
  TrackingPixel: "TrackingPixel",
  CryptoMining: "CryptoMining",
  // for now we change convention to be consistent with the .json file
  Phone: "phone_number",
  Email: "email_address",
  Zipcode: "zip_code",
})

export const privacyLabels = Object.freeze({
  location: {
    displayName: "Location",
    description: "",
    types: {
      coarseLocation: {
        displayName: "Coarse Location",
        description: "",
      },
      tightLocation: {
        displayName: "Tight Location",
        description: "",
      },
      zipCode: {
        displayName: "Zip Code",
        description: "",
      },
      ipAddress: {
        displayName: "Ip Address",
        description: "",
      },
      streetAddress: {
        displayName: "Street Address",
        description: "",
      },
      city: {
        displayName: "City",
        description: "",
      },
      state: {
        displayName: "State",
        description: "",
      },
    },
  },
  personalData: {
    displayName: "Personal Data",
    description: "",
    types: {
      phoneNumber: {
        displayName: "Phone Number",
        description: "",
      },
      emailAddress: {
        displayName: "Email Address",
        description: "",
      },
      social: {
        displayName: "Social",
        description: "",
      },
      userKeyword: {
        displayName: "Keyword",
        description: "",
      },
    },
  },
  advertising: {
    displayName: "Personal Data",
    description: "",
    types: {
      trackingPixel: {
        displayName: "Tracking Pixel",
        description: "",
      },
      analytics: {
        displayName: "Analytics",
        description: "",
      },
    },
  },
  fingerprinting: {
    displayName: "Fingerprinting",
    description: "",
    types: {
      generalFingerprint: {
        displayName: "General Fingerprinting",

      },
      invasiveFingerprint: {
        displayName: "Invasive Fingerprinting",
        description: "Used an API to extract information about a particular user’s computing environment when the API was not designed to expose such information.",
      }

    },
  },
  content: {
    displayName: "???",
    description: "",
    types: {},
  },
})



