import React from "react";
import * as Icons from "../icons";
import {
  SCard,
  SDescription,
  SSeperator,
  SHeader,
  SHeaderLeading,
  SHeaderTitle,
  SHeaderTrailing,
  SMore,
  SLogo,
} from "./style";
import { privacyLabels } from "../../background/analysis/classModels";
import { CompanyLogo } from "../website-logo";
import { getParents } from "../indexed-db";

/**
 * Card that briefly summarizes label and description for website
 */
const LabelCard = ({
  requests,
  website,
  label,
  margin,
  onTap,
  popup,
  labels,
}) => {
  const urls = Object.keys(requests); // detected request urls containing identified data
  const collected = urls.includes(website); // Check if website collected data

  /**
   * Get label description
   */
  const getDescription = () => {
    if (collected && urls.length > 1) {
      return `${website} collected and shared ${label} data`;
    } else if (collected) {
      return `${website} collected ${label} data.`;
    } else {
      return `${website} shared ${label} data`;
    }
  };

  /**
   * Get third party websites and render badges
   * Render max 2 badges
   */
  const getThirdParties = () => {
    let parentCompanies = getParents(labels);
    return (
      <>
        <SSeperator marginTop="16px" marginBottom="0px" />
        <SLogo>
          {parentCompanies.map((company) => (
            <CompanyLogo
              parent={company}
              key={company}
              margin={"8px 4px 0px 4px"}
            />
          ))}
        </SLogo>
      </>
    );
  };

  return (
    <SCard margin={margin} onClick={onTap} popup={popup}>
      <SHeader>
        <SHeaderLeading>
          {Icons.getLabelIcon(label)}
          <SHeaderTitle>{privacyLabels[label]["displayName"]}</SHeaderTitle>
        </SHeaderLeading>
        <SHeaderTrailing>
          <Icons.ChevronRight size="24px" />
        </SHeaderTrailing>
      </SHeader>
      <SDescription>{getDescription()}</SDescription>
      {getThirdParties()}
    </SCard>
  );
};

export default LabelCard;
