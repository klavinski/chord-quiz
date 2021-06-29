import * as React from "react";
import { createContext, useState } from "react";
import { chords } from "./chordTable";

export const initialConfiguration = {
    time: 3,
    session: null,
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
    },
    inversion: { 0: true, 1: false, 2: false, 3: false },
    type: { ...Object.fromEntries( Object.keys( chords ).map( chord => [ chord, false ] ) ), M: true },
    lastLearnChordIndex: null,
    language: "fr",
    sound: true
};

export const configurationContext = createContext( null );

export const ConfigurationProvider = ( { children } ) => {

    return <configurationContext.Provider value={ useState( initialConfiguration ) }>
        { children }
    </configurationContext.Provider>;
}