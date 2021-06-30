import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import { generateChord } from "./chordGenerator";
import { Storage } from "@capacitor/storage";

export const Session = ( { setChord } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const [ timeLeft, setTimeLeft ] = useState( configuration.time );
    useEffect( () => {

        setTimeLeft( configuration.time );
        if ( Array.isArray( configuration.session ) && configuration.time !== "M" ) {
            const timer = setInterval( () => setTimeLeft( timeLeft => {
                if ( timeLeft === 0 ) {
                    try {
                        const { lastChordIndex, ...chord } = generateChord( configuration );
                        setChord( chord );
                        setConfiguration( configuration => ( { ...configuration, lastChordIndex } ) );
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
                onClick={ () => {

                    if ( configuration.session.length > 0 ) 
                        Storage.keys()
                            .then( ( { keys } ) => Storage.set( {
                                key: keys.length.toString(),
                                value: JSON.stringify( configuration.session )
                            } ) );

                    setConfiguration( configuration => ( {
                        ...configuration,
                        session: null,
                        lastChordIndex: initialConfiguration.lastChordIndex
                    } ) );

                } }
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
    }{
        typeof configuration.time === "number" ? Math.floor( timeLeft ) : configuration.time
    }</>;
};