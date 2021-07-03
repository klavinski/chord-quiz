/** This is a generic stylable button. */

import * as React from "react";

export const Button = ( {
    children,
    gridArea,
    onClick,
    disabled,
    selected
}: {
    children,
    gridArea?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    disabled?: boolean,
    selected?: boolean
} ) => {

    return <div
        className={ "button" + ( selected ? " selected" : "" ) + ( disabled ? " disabled" : "" ) }
        onClick={ onClick ? onClick : undefined }
        style={ { gridArea: gridArea ?? "" } }
    >
        { children }
    </div>;
}