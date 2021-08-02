/*
Licensed per https://github.com/privacy-tech-lab/integrated-privacy-analysis/blob/main/LICENSE
privacy-tech-lab, https://www.privacytechlab.org/
*/

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getWebsites, getLabels } from "../../../libs/indexed-db/getIdbData.js";
import Scaffold from "../../components/scaffold";
import WebsiteLabelList from "../../components/website-label-list";
import LabelSummaryCardList from "./components/label-summary-card";
import LabelModal from "../home-view/components/detail-modal";
import { Modal } from "bootstrap";

import {
  SButtonText,
  SCardGroup,
  SContainer,
  SSectionContainer,
  SSubtitle,
  STitle,
} from "./style";

const exData = require('../../../assets/exampleData.json')

/**
 * Home page view containing overview and recently identified labels
 */
const HomeView = () => {
  const history = useHistory();
  const [websites, setWebsites] = useState({});
  const [labels, setLabels] = useState({});
  const [modal, setModal] = useState({ show: false });
  const entries = Object.entries(websites);
  const [exDataShow, setExDataShow] = useState(false);

  useEffect(
    () =>
      getWebsites().then((websites) => {
        if (Object.keys(websites).length == 0){
          setWebsites(exData.labelArrayPerSite)
          var check = true
          setExDataShow(true)
        } else {
          setWebsites(websites);
          setExDataShow(false)
        }
        getLabels().then((labels) => {
          if (check){
            setLabels(exData.dataJson);
          } else {
            setLabels(labels);
          }
        }),
          document
            .getElementById("detail-modal")
            .addEventListener("hidden.bs.modal", () => {
              setModal({ show: false });
            });
      }),
    []
  );

  const handleTap = (items) => {
    const modal = new Modal(document.getElementById("detail-modal"));
    setModal(items);
    modal.show();
  };

  return (
    <React.Fragment>
      <LabelModal
        label={modal.label}
        requests={modal.requests}
        website={modal.website}
        show={modal.show}
      />
      <Scaffold>
        <SContainer>
          <STitle>Overview</STitle>
          <SSubtitle>A summary of your privacy labels</SSubtitle>
          <SCardGroup>
            <LabelSummaryCardList labels={labels} />
          </SCardGroup>
        </SContainer>
        <SContainer marginTop>
          <SSectionContainer>
            <div>
              <STitle>Recent</STitle>
              <SSubtitle>
                See companies who recently collected or shared personal
                information
              </SSubtitle>
            </div>
            <SButtonText
              onClick={() =>
                history.push({
                  pathname: "/search",
                })
              }
            >
              See All
            </SButtonText>
          </SSectionContainer>
          <WebsiteLabelList
            allLabels={labels}
            websites={websites}
            maxLength={entries.length > 6 ? 5 : entries.length}
            handleTap={handleTap}
          />
        </SContainer>
      </Scaffold>
    </React.Fragment>
  );
};

export default HomeView;
