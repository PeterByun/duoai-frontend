import React from "react";
import { ImgStyle, ImgStyleProps } from "../components-styled/StyledImg.style";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: React.ReactNode
}

export const Img = (props: ImgProps & ImgStyleProps) => {
    return (
        <ImgStyle {...props}>
            {props.children}
        </ImgStyle>
    )
}
