import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '../components/AppBaseStyle'

export type SearchBarStyleProps = {
} & BaseStyleProps

export const SearchBarStyle = styled.div<SearchBarStyleProps>`
    ${BaseStyle}

    background-color: var(--blue);    

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0 2rem 0 2rem;
    
    border-radius: 5px;
    
    button {
        position: relative;
        left: 10px;
        top: 10px;
    }
`