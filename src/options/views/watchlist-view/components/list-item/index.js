import React, { useState, useRef, useEffect } from "react";
import {
  SAction,
  SItem,
  SKeyword,
  SType,
  SDropdownOptions,
  SDropdownItem,
} from "./style";
import * as Icons from "../../../../../libs/icons";
import { deleteKeyword } from "../../../../../libs/indexed-db/updateKeyword.js";
import { keywordTypes } from "../../../../../background/analysis/classModels";
import { Modal } from "bootstrap";

/**
 * List item displaying keyword and type
 * User can edit/delete keyword from vertical options button
 */
const ListItem = ({ keyword, type, id, configModal, updateList, location }) => {
  const dropdownRef = useRef();
  const [showDropdown, setDropdown] = useState(false);

  /**
   * Closes dropdown when clicked outside
   */
  const blur = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", blur);
    return () => document.removeEventListener("mousedown", blur);
  }, []);

  return (
    <SItem>
      <SKeyword>{keyword}</SKeyword>
      <div>
        <SType>
          {type in keywordTypes ? keywordTypes[type]["displayName"] : "Error"}
        </SType>
        <SAction
          ref={dropdownRef}
          onClick={() => setDropdown((state) => !state)}
        >
          <SDropdownOptions show={showDropdown}>
            <SDropdownItem
              onClick={async () => {
                await deleteKeyword(id, type);
                await updateList();
              }}
            >
              Delete
            </SDropdownItem>
            <SDropdownItem
              onClick={() => {
                configModal((config) => ({
                  ...config,
                  edit: true,
                  show: true,
                  keyword: keyword,
                  keywordType: type,
                  id: id,
                  location: location,
                }));
                const modal = new Modal(document.getElementById("edit-modal"));
                modal.show();
              }}
            >
              Edit
            </SDropdownItem>
          </SDropdownOptions>
          <Icons.MoreVertical size="24px" />
        </SAction>
      </div>
    </SItem>
  );
};

export default ListItem;
