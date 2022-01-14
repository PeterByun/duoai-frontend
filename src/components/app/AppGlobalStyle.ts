import { css } from '@emotion/react'

const breakpoints: { [index: string]: number } = {
  sm: 350,
  md: 768,
  lg: 1200,
}

export const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`
    return prev
  }, {} as { [index: string]: string })

export const GlobalStyle = css`
  @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  :root {
    ${mq['sm']} {
      font-size: 10px;
    }
    ${mq['md']} {
      font-size: 11px;
    }
    ${mq['lg']} {
      font-size: 12px;
    }

    font-family: 'NEXON Lv1 Gothic OTF';

    // Colors
    --main-bg-color: #fefefe;

    --black: #000000;
    --white: #ffffff;
    --gray: #c6c6c6;

    --blue: #1089ff;
    --red: #ff1010;
    --green: #31ff10;
    --yellow: #ecff10;

    --light-gray: #dededede;
    --light-blue: #75bbff;
    --light-red: #fc707569;
    --light-green: #8fff7c;
    --light-yellow: #f3ff65;

    --lighter-blue: #9fd0ff;

    --gradient--yellow: linear-gradient(90deg, #fdff8a 0%, #ffe609 100%);

    --shadow-light-yelllow: 0 0px 10px 15px rgb(244 247 29 / 46%);

    // Colors by status

    --dark-blue: #0e4c89;
    --dark-gray: #2d2d2d;

    --win: #2dfaf8;
    --lose: #ff7d7f;

    --win-dark: #21e3e1;
    --lose-dark: #c05758;

    --team-blue: #1aace5;
    --team-red: #e54e53;

    --team-light-blue: #16b3f161;
    --team-light-red: #fc7075e0;

    --logo-blue: #2e53f3;

    --disabled: #9c9c9cde;
  }
  ::selection {
    background-color: #1089ffba;
  }
  html {
    background-color: var(--main-bg-color);
    width: 100vw;
    height: auto;
  }
  body,
  #root {
    width: 100%;
    height: 100%;
  }
  body {
    margin: 0px;
    display: flex;
    flex-direction: column;
  }
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  #root > nav:last-of-type {
    margin-bottom: 3rem;
  }
`
