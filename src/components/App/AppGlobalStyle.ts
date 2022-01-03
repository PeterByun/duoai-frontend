import { css } from '@emotion/react'

export const GlobalStyle = css`
    @font-face {
        font-family: 'NEXON Lv1 Gothic OTF';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    :root {
        font-family: 'NEXON Lv1 Gothic OTF';

        // Colors
        --main-bg-color: #fefefe;

        --black: #000000;
        --white: #ffffff;
        --gray: #c6c6c6;

        --blue: #1089FF;
        --red: #FF1010;
        --green: #31FF10; 
        --yellow: #ECFF10;

        --light-gray: #dededede;
        --light-blue: #75BBFF;
        --light-red: #fc707569;
        --light-green: #8FFF7C;
        --light-yellow: #F3FF65;

        --lighter-blue: #9fd0ff;

        --gradient--yellow: linear-gradient(90deg, #FDFF8A 0%, #FFE609 100%); 
        
        --shadow-light-yelllow: 0 0px 10px 15px rgb(244 247 29 / 46%);
        
        // Colors by status

        --dark-blue: #0E4C89;
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
        width: 100%;
        height: auto;
    }
    body, #root {
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
    `