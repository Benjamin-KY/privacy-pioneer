/*
Licensed per https://github.com/privacy-tech-lab/privacy-pioneer/blob/main/LICENSE
privacy-tech-lab, https://www.privacytechlab.org/
*/

import React, { useEffect, useRef, useState } from "react"
import Scaffold from "../../components/scaffold"
import ReactTooltip from "react-tooltip"
import {
  STitle,
  SContainer,
  SSubtitle,
  SSettingHeader,
  SBody,
  SSection,
  SSeperator,
} from "./style"
import {
  ToggleSwitch,
  ThemeSelection,
  ExportData,
  DangerZone,
  LabelToggle,
  FullSnippetToggle,
  Tour,
  OptimizationToggle
} from "./components"

/**
 * Settings page view
 */
const SettingsView = ({ changeTheme }) => {
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])
  return (
    <Scaffold>
      <SContainer>
        <STitle>Settings</STitle>
        <SSubtitle>Manage the extension</SSubtitle>
        <SBody>
          <SSection>
            {/* <ToggleSwitch label="Enabled" /> */}
            <SSettingHeader>Labels</SSettingHeader>
            <SSubtitle>Toggle which labels you want to track</SSubtitle>
            <LabelToggle />
            <SSettingHeader>Theme</SSettingHeader>
            <SSubtitle>Choose the theme of the extension</SSubtitle>
            <ThemeSelection changeTheme={changeTheme} />
          </SSection>
          <SSeperator marginLeft="32px" marginRight="32px" />
          <SSection>
            <div>
              <SSettingHeader>Export Data</SSettingHeader>
              <SSubtitle>
                Export all of the data and evidence from the extension
              </SSubtitle>
              <ExportData />
            </div>
            <DangerZone />
            <FullSnippetToggle />
            <OptimizationToggle />
            <Tour/>
          </SSection>
        </SBody>
      </SContainer>
    </Scaffold>
  )
}

export default SettingsView
