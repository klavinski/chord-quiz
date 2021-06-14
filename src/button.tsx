import * as React from "react";
import { useState } from "react";

export const Button = ( { children, gridArea, onClick, selected }: { children, gridArea?, onClick, selected? } ) => {

    const [ hover, setHover ] = useState( false );
    return <div
        onClick={ onClick }
        onMouseEnter={ () => setHover( true ) }
        onMouseLeave={ () => setHover( false ) }
        style={ {
            backgroundColor: selected ? "darkseagreen" : hover ? "lightblue" : "transparent",
            boxShadow: "",
            cursor: hover ? "pointer": "default",
            textAlign: "center",
            gridArea: gridArea ?? ""
        } }
    >
        { children }
    </div>;
}