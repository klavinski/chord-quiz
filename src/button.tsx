import * as React from "react";

export const Button = ( { children, gridArea, onClick, disabled, selected }: { children, gridArea?, onClick?, disabled?, selected? } ) => {

    return <div
        className={ "button" + ( selected ? " selected" : "" ) + ( disabled ? " disabled" : "" ) }
        onClick={ onClick ? onClick : undefined }
        style={ { gridArea: gridArea ?? "" } }
    >
        { children }
    </div>;
}