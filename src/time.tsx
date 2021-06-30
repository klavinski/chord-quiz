import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tippy";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import "web-midi-api";

export const TimeMenu = ( { children } ) => {

    const [ showMIDI, setShowMIDI ] = useState( false );
    useEffect( () => {
        navigator.requestMIDIAccess().then( () => { setShowMIDI( true ) } );
    }, [] );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip trigger="click" html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 2, 1fr )" } }
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
        onClick={ () => setConfiguration( configuration => ( { ...configuration, learn: ! configuration.learn } ) ) }
        selected={ configuration.learn }
    >
        Learn
    </Button>
    {
        showMIDI &&
        <Button
            gridArea="5 / 2 / span 1 / span 1"
            onClick={ () => setConfiguration( { ...configuration, time: "MIDI" } ) }
            selected={ configuration.time === "MIDI" }
        >
            MIDI
        </Button>
    }
    </div> }>
        { children }
    </Tooltip>;
}