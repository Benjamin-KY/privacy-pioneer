/*
Licensed per https://github.com/privacy-tech-lab/privacy-pioneer/blob/main/LICENSE
privacy-tech-lab, https://www.privacytechlab.org/
*/

import React, { useRef, useState, useEffect } from "react"
import {
  IconWrapper,
  SHeader,
  SLeading,
  SMiddle,
  SModal,
  SNavigationBar,
  STitle,
  STrailing,
  SType,
  SDropdown,
  SActionGroup,
  SAction,
  SDropdownSelection,
  SDropdownOptions,
  SDropdownItem,
  SContent,
  SErrorText,
} from "./style"
import * as Icons from "../../../../../libs/icons"
import { saveKeyword } from "../../../../../libs/indexed-db/updateWatchlist.js"
import {
  keywordTypes,
  permissionEnum,
  typeEnum,
} from "../../../../../background/analysis/classModels"
import { Modal } from "bootstrap"
import { AddressForm, KeywordForm } from "./components/forms"
import validate from "./components/input-validators"
import ReactTooltip from "react-tooltip"

/**
 * Popup modal to create/edit keyword
 */
const EditModal = ({ passKeywordType, passKeyword, edit, id, updateList }) => {
  const dropdownRef = useRef()
  const [showDropdown, setDropdown] = useState(false)
  const [keywordType, setKeywordType] = useState(
    edit ? passKeywordType : "Select Type"
  )
  const [keyword, setKeyword] = useState(edit ? passKeyword : "")
  const [address, setAddress] = useState(
    edit ? keyword[typeEnum.streetAddress] ?? null : ""
  )
  const [city, setCity] = useState(edit ? keyword[typeEnum.city] ?? null : "")
  const [state, setStateloc] = useState(
    edit ? keyword[typeEnum.state] ?? null : ""
  )
  const [zip, setZip] = useState(edit ? keyword[typeEnum.zipCode] ?? null : "")
  const [inputValid, setInputValid] = useState(true)
  const [keyType, setKeyType] = useState("")

  /**
   * Closes dropdown when clicked outside
   */
  const blur = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setDropdown(false)
    }
  }

  const handleAddressChange = (type, value) => {
    switch (type) {
      case typeEnum.city:
        setCity(value)
        break
      case typeEnum.state:
        setStateloc(value)
        break
      case typeEnum.zipCode:
        setZip(value)
        break
      case typeEnum.streetAddress:
        setAddress(value)
        break
    }
  }

  const handleKeywordChange = (value) => {
    setKeyword(value)
  }

  useEffect(() => {
    document.addEventListener("mousedown", blur)
    ReactTooltip.rebuild()
    return () => document.removeEventListener("mousedown", blur)
  }, [])

  return (
    <>
      <SContent className="modal-content">
        <SModal>
          <SNavigationBar>
            <SLeading />
            <SMiddle>
              <STitle>{edit ? "Edit Keyword" : "Add Keyword"}</STitle>
            </SMiddle>
            <STrailing>
              <IconWrapper data-bs-dismiss="modal" aria-label="Close">
                <Icons.Close size="24px" />
              </IconWrapper>
            </STrailing>
          </SNavigationBar>
          <SType>
            <SHeader>TYPE</SHeader>
            <SDropdown
              ref={dropdownRef}
              onClick={() => {
                setDropdown((state) => !state)
              }}
            >
              <SDropdownOptions show={showDropdown}>
                {Object.keys(keywordTypes).map((key, index) => (
                  <SDropdownItem
                    data-place="right"
                    data-tip={keywordTypes[key]["toolTip"]}
                    onClick={() => {
                      setKeywordType(key)
                      setInputValid(true)
                      setKeyword("")
                    }}
                    key={index}
                  >
                    {keywordTypes[key]["displayName"]}
                  </SDropdownItem>
                ))}
              </SDropdownOptions>
              <SDropdownSelection>
                {keywordType in keywordTypes
                  ? keywordTypes[keywordType]["displayName"]
                  : "Select Type"}
                <Icons.ChevronDown size="24px" />
              </SDropdownSelection>
            </SDropdown>
          </SType>
          {keywordType != permissionEnum.location ? (
            <KeywordForm
              keywordType={keywordType}
              onChange={handleKeywordChange}
              value={keyword}
            />
          ) : (
            <AddressForm
              onChange={handleAddressChange}
              city={city}
              state={state}
              zip={zip}
              streetAddress={address}
            />
          )}
          {inputValid ? null : (
            <SErrorText> Please enter a valid {keyType} </SErrorText>
          )}
          <SActionGroup>
            <SAction data-bs-dismiss="modal" aria-label="Close" color="#e57373">
              Cancel
            </SAction>
            <SAction
              onClick={async () => {
                let key
                if (keywordType == permissionEnum.location) {
                  key = {
                    [typeEnum.streetAddress]: address,
                    [typeEnum.zipCode]: zip,
                    [typeEnum.state]: state,
                    [typeEnum.city]: city,
                    display: `${address}, ${city}, ${state} ${zip}`,
                  }
                } else {
                  key = keyword
                }
                // check if user input is valid
                if (
                  validate({
                    keyword,
                    keywordType,
                    setInputValid,
                    setKeyType,
                    state,
                    city,
                    zip,
                    address,
                  })
                ) {
                  if (await saveKeyword(key, keywordType, id)) {
                    await updateList()
                    const modal = Modal.getInstance(
                      document.getElementById("edit-modal")
                    )
                    modal.hide()
                  }
                }
              }}
              color="#64b5f6"
            >
              Save
            </SAction>
          </SActionGroup>
        </SModal>
      </SContent>
    </>
  )
}

export default EditModal
