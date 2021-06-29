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
                    try {
                        const { lastLearnChordIndex, ...chord } = generateChord( configuration );
                        setChord( chord );
                        setConfiguration( configuration => ( { ...configuration, lastLearnChordIndex } ) );
                    } catch( e ) {
                        console.error( "Invalid chord configuration selected." );
                    }
                    return configuration.time
                }
                else return timeLeft - .5;
            } ), 500 );
            return () => clearInterval( timer );

        }

    }, [ configuration ] );

    return <>{
        Array.isArray( configuration.session ) ?
            <Button
                onClick={ () => setConfiguration( configuration => ( { ...configuration, session: null, lastLearnChordIndex: null } ) ) }
            >
                STOP
            </Button>:
            <Button
                onClick={ () => { setConfiguration( configuration => ( { ...configuration, session: [] } ) ) } }
            >
                START
            </Button>
    }{
        configuration.time === "M" && Array.isArray( configuration.session ) &&
            <Button
                onClick={ () => {
                    try {
                        const { lastLearnChordIndex, ...chord } = generateChord( configuration );
                        console.log( "last", chord );
                        setChord( chord );
                        setConfiguration( configuration => ( { ...configuration, lastLearnChordIndex } ) );
                    } catch( e ) {
                        console.error( "Invalid chord configuration selected." );
                    }
                } }
            >
                NEXT
            </Button>
    }{
        configuration.time === "M" ? "M" : Math.floor( timeLeft )
    }</>;
};