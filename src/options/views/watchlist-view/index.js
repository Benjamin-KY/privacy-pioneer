import React, { useEffect, useState } from "react"
import Scaffold from "../../components/scaffold"
import { SAddButton, SHeader, SListContent, SListHeader, STitle } from "./style"
import { SContainer, SSubtitle } from "./style"
import * as Icons from "../../../libs/icons"
import ListItem from "./components/list-item"
import EditModal from "./components/edit-modal"
import { WatchlistKeyval } from "../../../libs/indexed-db"
import { importData } from "../../../background/analysis/importSearchData"
import { Modal } from "bootstrap"
import { BrowserRouter } from "react-router-dom"

/**
 * Watchlist page view allowing user to add/modify keywords
 */
const WatchlistView = () => {
  const [modalConfig, configModal] = useState({ show: false, edit: false })
  const [items, setItems] = useState([])

  /**
   * Inflates view with keywords from watchlist keystore
   */
  const updateList = () => {
    WatchlistKeyval.values().then((values) => setItems(values));
    browser.runtime.sendMessage( {
      msg: "dataUpdated"
    } );
  }

  useEffect(() => {
    updateList()
    // Add listener to modal so we can reset it by taking it off the dom so it doesn't hold references
    document.getElementById("edit-modal").addEventListener("hidden.bs.modal", () => {
      configModal({ show: false })
    })
  }, [])

  return (
    <React.Fragment>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="edit-modal"
        tabIndex="-1"
        aria-labelledby="edit-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          {modalConfig.show ? (
            <EditModal
              keywordType={modalConfig.keywordType}
              keyword={modalConfig.keyword}
              id={modalConfig.id}
              edit={modalConfig.edit}
              configModal={configModal}
              updateList={updateList}
            />
          ) : null}
        </div>
      </div>

      <Scaffold>
        <SContainer>
          <SHeader>
            <div>
              <STitle>Watchlist</STitle>
              <SSubtitle>
                Edit your watchlist so we can monitor personal information collected and shared between companies.
              </SSubtitle>
            </div>
            <div>
              <SAddButton
                onClick={() => {
                  configModal({ show: true })
                  const modal = new Modal(document.getElementById("edit-modal"))
                  modal.show()
                }}
              >
                <Icons.Plus size="24px" />
                Add Keyword
              </SAddButton>
            </div>
          </SHeader>
          <SListHeader>
            <div>KEYWORD</div>
            <div>TYPE</div>
          </SListHeader>
          <SListContent>
            {items.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                type={item.type}
                keyword={item.keyword}
                configModal={configModal}
                updateList={updateList}
              />
            ))}
          </SListContent>
        </SContainer>
      </Scaffold>
    </React.Fragment>
  )
}

export default WatchlistView
