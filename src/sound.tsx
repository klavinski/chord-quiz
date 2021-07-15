import * as React from "react";
import { useContext, useEffect } from "react";
import { configurationContext } from "./configuration";
import { Piano } from "@tonejs/piano";

const piano = new Piano();
piano.toDestination();
piano.load();

export const Sound = ( { notes } ) => {

    const [ configuration ] = useContext( configurationContext );
    useEffect( () => {
        
        if ( piano.loaded && configuration.sound ) {

            notes.forEach( note => piano.keyDown( { note } ) );
            return () => notes.forEach( note => piano.keyUp( { note } ) );

        }

    }, [ configuration.sound, notes ] );

    return <></>;
};