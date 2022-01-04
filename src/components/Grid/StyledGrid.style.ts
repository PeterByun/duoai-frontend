import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/App/AppBaseStyle'


export type GridStyleProps = {
    backgroundColor?: string
    gridTemplateRows?: string
    gridTemplateColumns?: string

    gridColumn?: string

    emphasized?: boolean

    boxShadow?: string
    isChildrenClickable?: boolean
} & BaseStyleProps

export const GridStyle = styled.section<GridStyleProps>`
    ${BaseStyle}

    display: grid;
    grid-template-rows: ${({gridTemplateRows}) =>gridTemplateRows ? gridTemplateRows : 'auto'};
    grid-template-columns: ${({gridTemplateColumns}) => gridTemplateColumns ? gridTemplateColumns : 'repeat(10, 1fr)'};
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;

    grid-column: ${({gridColumn}) => gridColumn ? gridColumn : null};

    width: ${({width}) => { return width ? width : 'auto'}};
    height: ${({height}) => { return height ? height : 'auto'}};
    
    margin: '0';
    padding: ${({padding}) => { return padding ? padding : '5%'}};
    
    > * {
        :hover {
            cursor: ${({isChildrenClickable}) => isChildrenClickable ? 'pointer' : null };
        }
    }
    
    box-shadow: ${({emphasized, boxShadow}) => emphasized ? '0 20px 15px #949494' :  boxShadow ?  boxShadow : null };
    transform: ${({emphasized}) => emphasized ? 'scale(1.1) translate(0, -25%)' : 'null' };

    transition: 0.1s transform ease-in-out, 0.1s box-shadow ease-in-out;
`