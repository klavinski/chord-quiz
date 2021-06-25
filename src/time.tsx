import * as React from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import { type } from "os";

export const TimeMenu = ( { children } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip trigger="click" html={ <div
        style={ {
            boxShadow: "rgba( 0, 0, 0, .2 ) 0px 0px 1rem",
            padding: "2vmin",
            borderRadius: "2vmin",
            backgroundColor: "white"
        } }
    >
    <Button
        onClick={ () => setConfiguration( { ...configuration, time: initialConfiguration.time } ) }
    >
        Auto
    </Button>{
        [ 8, 7, 6, 5, 4, 3, 2, 1, "Man." ].map( time =>
            <Button
                selected={ configuration.time === time }
                onClick={ () => setConfiguration( { ...configuration, time } ) }
                key={ time }
            >
                { time }
            </Button>
        )
    }<Button
        onClick={ () => setConfiguration( { ...configuration, lastLearnChordIndex: typeof configuration.lastLearnChordIndex === "number" ? null : -1 } ) }
        selected={ typeof configuration.lastLearnChordIndex === "number" }
    >
        Learn
    </Button>
    </div> }>
        { children }
    </Tooltip>;
}