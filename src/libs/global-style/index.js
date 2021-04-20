import { createGlobalStyle, css } from "styled-components"

const Popup = css`
  body {
    height: 600px;
    width: 360px;
    background-color: var(--backgroundColor);
    color: var(--primaryTextColor);
    font-size: var(--body1);
    overflow-x: hidden;
    font-family: "Source Sans Pro", sans-serif;
  }
`

const Options = css`
  body {
    padding: 0px;
    margin: 0px;
    font-family: "Source Sans Pro", sans-serif;
    background-color: var(--backgroundColor);
  }
  #root {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--primaryTextColor);
    font-size: var(--body1);
  }
`

const GlobalStyle = createGlobalStyle`
  :root {
    /* Colors */
    --primaryBrandColor: #6B219F;
    --primaryBrandTintColor: #F2E8F9;
    --backgroundColor: #ffffff;
    --primaryTextColor: #000000;
    --secondaryTextColor: #3c3c43;
    --cardColor: #f2f2f7;
    --textFieldColor: #d1d1d6;
    --seperatorColor: #c6c6c8;

    /* Font Sizes */
    --title1: 24px;
    --title2: 20px;
    --headline: 18px;
    --body1: 16px;
    --body2: 14px;
  }

  /* Dark Mode */
  @media (prefers-color-scheme: dark) {
    :root {
      --backgroundColor: #1c1c1e;
      --primaryTextColor: #ffffff;
      --secondaryTextColor: #ebebf5;
      --cardColor: #2c2c2e;
      --textFieldColor: #3a3a3c;
      --seperatorColor: #38383a;
    }
  }

  ${(props) => (props.popup ? Popup : Options)}

  path, circle {
    fill: var(--primaryTextColor);
  }
`

export default GlobalStyle