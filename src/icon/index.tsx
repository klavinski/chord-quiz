import * as React from "react";
import imgs from "./*.svg";

export const Icon = ( { type }: { type: keyof imgs } ) => {

    return <img src={ imgs[ type ] } style={ { width: "10vmin", height: "10vmin", backgroundColor: "white" } }/>;
}