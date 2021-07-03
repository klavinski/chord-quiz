/** configuration stores the options selected by the user. The initial value is provided by initialConfiguration. */

import * as React from "react";
import { createContext, useState } from "react";

export type Tonic = "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B";
export type Chord = "dim7" | "oM7" | "m6" | "madd9" | "m7" | "mM7" | "m7b5" | "7aug" | "maj7+5" | "add6" | "add9" | "dom" | "M7" | "7sus" | "7b5" | "m" | "dim" | "m+" | "M" | "Mb5" | "aug" | "sus";

export type Configuration = {

    activeSession: boolean
    inversion: { [ key in 0 | 1 | 2 | 3 ]: boolean },
    language: "fr" | "en",
    lastChordIndex: number, //  index of the last generated chord in allChords from chordGenerator. Used for the learn mode.
    learn: boolean,
    showKeyboard: boolean,
    showOtherSymbols: boolean,
    sound: boolean,
    showStave: boolean,
    showSymbol: boolean,
    time: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "M" | "MIDI",
    session?: {
        // if number, how many were selected, if boolean, if it was selected.
        // each entry matches a correct chord or a wrong chord during the session.
        tonic: number,
        chord3: number,
        chord4: number,
        inversion: boolean
        success: boolean
    }[],
    tonic: { [ tonic in Tonic ]: boolean },
    type: { [ key in Chord ]: boolean }
};

export const initialConfiguration: Configuration = {
    time: 3,
    activeSession: false,
    session: [],
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
    type: {
        "M": true,
        "Mb5": false,
        "aug": false,
        "sus": false,
        "m": false,
        "dim": false,
        "m+": false,
        "dom": false,
        "M7": false,
        "7sus": false,
        "7b5": false,
        "7aug": false,
        "maj7+5": false,
        "add6": false,
        "add9": false,
        "m7": false,
        "mM7": false,
        "m7b5": false,
        "oM7": false,
        "m6": false,
        "madd9": false,
        "dim7": false
    },
    learn: false,
    lastChordIndex: -1,
    language: "fr",
    sound: true,
    showSymbol: true,
    showOtherSymbols: true,
    showStave: true,
    showKeyboard: true
};

export const configurationContext = createContext<[ Configuration, React.Dispatch<React.SetStateAction<Configuration>>]>( null );

export const ConfigurationProvider = ( { children } ) => {

    return <configurationContext.Provider value={ useState( initialConfiguration ) }>
        { children }
    </configurationContext.Provider>;
}