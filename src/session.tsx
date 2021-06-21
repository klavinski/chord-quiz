import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { configurationContext } from "./configuration";
import { Button } from "./button";
import { generateChord } from "./chordGenerator";

export const Session = ( { setChord } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const [ timeLeft, setTimeLeft ] = useState( configuration.time );
    useEffect( () => {

        setTimeLeft( configuration.time );
        if ( Array.isArray( configuration.session ) && configuration.time !== "M" ) {
            const timer = setInterval( () => setTimeLeft( timeLeft => {
                if ( timeLeft === 0 ) {
                    setChord( generateChord( configuration ) );
                    return configuration.time
                }
                else return timeLeft - .5;
            } ), 500 );
            return () => clearInterval( timer );

        }

    }, [ configuration.session, configuration.time ] );

    return <>{
        Array.isArray( configuration.session ) ?
            <Button
                onClick={ () => setConfiguration( configuration => ( { ...configuration, session: null } ) ) }
            >
                STOP
            </Button>:
            <Button
                onClick={ () => { setConfiguration( configuration => ( { ...configuration, session: [] } ) ) } }
            >
                START
            </Button>
    }{
        configuration.time === "Man" && Array.isArray( configuration.session ) &&
            <Button
                onClick={ () => setChord( generateChord( configuration ) ) }
            >
                NEXT
            </Button>
    }{
        configuration.time === "Man" ? "M" : Math.floor( timeLeft )
    }</>;
};