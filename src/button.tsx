import * as React from "react";
import { useState } from "react";

export const Button = ( { children, gridArea, onClick, selected }: { children, gridArea?, onClick?, selected? } ) => {

    const [ hover, setHover ] = useState( false );
    return <div
        onClick={ onClick ? onClick : undefined }
        onMouseEnter={ () => setHover( true ) }
        onMouseLeave={ () => setHover( false ) }
        style={ {
            display: "flex",
            backgroundColor: selected ? "rgb(204, 221, 174)" : hover ? "rgb(227, 235, 244)" : "rgba(227, 235, 244, .4)",
            boxShadow: "",
            cursor: "pointer",
            gridArea: gridArea ?? "",
            justifyContent: "center",
            minHeight: "10vmin",
            minWidth: "10vmin",
            alignItems: "center"
        } }
    >
        { children }
    </div>;
}