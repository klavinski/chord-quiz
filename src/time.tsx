import * as React from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import { type } from "os";

export const TimeMenu = ( { children } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip trigger="click" html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 1, 1fr )" } }
    >
    <Button
        gridArea="1 / 1 / span 1 / span 1"
        onClick={ () => setConfiguration( { ...configuration, time: initialConfiguration.time } ) }
    >
        Auto
    </Button>{
        [ 8, 7, 6, 5, 4, 3, 2, 1 ].map( time =>
            <Button
                gridArea={ 10 - time + " / 1 / span 1 / span 1" }
                selected={ configuration.time === time }
                onClick={ () => setConfiguration( { ...configuration, time } ) }
                key={ time }
            >
                { time }
            </Button>
        )
    }
    <Button
        gridArea="1 / 2 / span 1 / span 1"
        selected={ configuration.time === "M" }
        onClick={ () => setConfiguration( { ...configuration, time: "M" } ) }
    >
        Man.
    </Button>
    <Button
        gridArea="3 / 2 / span 1 / span 1"
        onClick={ () => setConfiguration( { ...configuration, lastLearnChordIndex: typeof configuration.lastLearnChordIndex === "number" ? null : -1 } ) }
        selected={ typeof configuration.lastLearnChordIndex === "number" }
    >
        Learn
    </Button>
    </div> }>
        { children }
    </Tooltip>;
}