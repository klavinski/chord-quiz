/** This file handles starting and stopping a session, saving its data, the timer, and generates a chord upon its depletion. */

import { Storage } from "@capacitor/storage";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Button } from "./button";
import { generateChord } from "./chordGenerator";
import { configurationContext, initialConfiguration } from "./configuration";

export const Session = ( { setChord } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const [ timeLeft, setTimeLeft ] = useState<number>( typeof configuration.time === "number" ? configuration.time : 0 );

    useEffect( () => {        
        
        if ( configuration.activeSession && typeof configuration.time === "number" ) {
            const timer = setInterval( () => setTimeLeft( timeLeft => {                
                
                setConfiguration( configuration => {
                        if ( timeLeft === 0 )
                            try {
                                const { lastChordIndex, ...chord } = generateChord( configuration );
                                setChord( chord );
                                return { ...configuration, lastChordIndex };
                            } catch( e ) {
                                console.error( "Invalid chord configuration selected." );
                            }
                    return configuration;
                } );
                return timeLeft === 0 && typeof configuration.time === "number" ? configuration.time : timeLeft - .5;
                
            } ), 500 );

            return () => clearInterval( timer );
        }

    }, [ configuration.time, configuration.activeSession ] );

    return <>
        <Button
            gridArea="start"
            onClick={ () => {

                // We initialise a session with an empty array.
                if ( configuration.activeSession ) {

                    if ( configuration.session.length > 0 ) 
                        Storage.keys()
                            .then( ( { keys } ) => Storage.set( {
                                key: keys.length.toString(),
                                value: JSON.stringify( configuration.session )
                            } ) );

                    setConfiguration( configuration => ( {
                        ...configuration,
                        activeSession: false,
                        lastChordIndex: initialConfiguration.lastChordIndex
                    } ) );

                } else
                    try {
                        const { lastChordIndex, ...newChord } = generateChord( configuration );
                        setChord( newChord );
                        setConfiguration( configuration => ( { ...configuration, lastChordIndex, activeSession: true, session: [] } ) );
                    } catch( e ) {
                        console.error( "Invalid chord configuration selected." );
                    }
            } }
        >
            { configuration.activeSession ? "STOP" : "START" }
        </Button>
        <Button
            disabled={ configuration.time !== "M" || ! configuration.activeSession }
            gridArea="next"
            onClick={ () => {
                try {
                    const { lastChordIndex, ...chord } = generateChord( configuration );
                    setChord( chord );
                    setConfiguration( configuration => ( { ...configuration, lastChordIndex } ) );
                } catch( e ) {
                    console.error( "Invalid chord configuration selected." );
                }
            } }
        >
            NEXT
        </Button>
        <div style={ {
            gridArea: "timer",
            fontSize: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        } }>{
            typeof configuration.time === "number" ? Math.floor( timeLeft ) : configuration.time
        }</div>
    </>;
};