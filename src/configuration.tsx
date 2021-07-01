import * as React from "react";
import { createContext, useState } from "react";
import { chords } from "./chordTable";

export const initialConfiguration = {
    time: 3,
    session: null,
    tonic: {
        "C": true,
        "C#": false,
        "Db": false,
        "D": false,        
        "D#": false,
        "Eb": false,
        "E": false,        
        "F": false,
        "F#": false,
        "Gb": false,
        "G": false,        
        "G#": false,
        "Ab": false,
        "A": false,        
        "A#": false,
        "Bb": false,
        "B": false        
    },
    inversion: { 0: true, 1: false, 2: false, 3: false },
    type: { ...Object.fromEntries( Object.keys( chords ).map( chord => [ chord, false ] ) ), M: true },
    learn: false,
    lastChordIndex: -1,
    language: "fr",
    sound: true,
    showSymbol: true,
    showOtherSymbols: true,
    showStave: true,
    showKeyboard: true
};

export const configurationContext = createContext( null );

export const ConfigurationProvider = ( { children } ) => {

    return <configurationContext.Provider value={ useState( initialConfiguration ) }>
        { children }
    </configurationContext.Provider>;
}