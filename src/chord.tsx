import { Chord, Midi }from "@tonaljs/tonal";
import * as React from "react";
import { initialConfiguration } from "./configuration";

export const generateChord = ( configuration: typeof initialConfiguration ) => {

    const tonics = Object.keys( configuration.tonic ).filter( note => configuration.tonic[ note ] );
    const root = tonics[ Math.floor( Math.random() * tonics.length ) ];
    const octave = 3;

    const chord = Chord.getChord( "maj7", root + octave, root + octave );
    return {
        ...chord,
        Encoding: () => <div>{ root + chord.type }</div>,
        AlternateEncodings: () => <div>{ chord.aliases.map( alias => root + alias ).join( ", " ) }</div>,
        midiNotes: chord.notes.map( Midi.toMidi )
    };
    
};