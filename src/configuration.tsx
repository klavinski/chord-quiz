import * as React from "react";
import { createContext, useState } from "react";

export const initialConfiguration = {
    time: 3,
    tonic: {
        "C": true,
        "C#": false,
        "D": false,
        "Db": false,
        "D#": false,
        "E": false,
        "Eb": false,
        "F": false,
        "F#": false,
        "G": false,
        "Gb": false,
        "G#": false,
        "A": false,
        "Ab": false,
        "A#": false,
        "B": false,
        "Bb": false
    }
};

export const configurationContext = createContext( null );

export const ConfigurationProvider = ( { children } ) => {

    return <configurationContext.Provider value={ useState( initialConfiguration ) }>
        { children }
    </configurationContext.Provider>;
}