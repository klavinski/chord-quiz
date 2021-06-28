import * as React from "react";
import { useState } from "react";

export const Button = ( { children, gridArea, onClick, selected }: { children, gridArea?, onClick, selected? } ) => {

    const [ hover, setHover ] = useState( false );
    return <div
        onClick={ onClick ? onClick : undefined }
        onMouseEnter={ () => setHover( true ) }
        onMouseLeave={ () => setHover( false ) }
        style={ {
            display: "flex",
            backgroundColor: selected ? "rgb(90, 211, 160)" : hover ? "rgb(39, 192, 239)" : "rgba(39, 192, 239, .1)",
            boxShadow: "",
            cursor: "pointer",
            gridArea: gridArea ?? "",
            justifyContent: "center"
        } }
    >
        { children }
    </div>;
}