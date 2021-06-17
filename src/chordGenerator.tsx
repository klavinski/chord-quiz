import { Chord, Midi }from "@tonaljs/tonal";
import * as React from "react";
import { initialConfiguration } from "./configuration";
import { chords } from "./chordTable";

export const generateChord = ( configuration: typeof initialConfiguration ) => {

    const tonics = Object.keys( configuration.tonic ).filter( note => configuration.tonic[ note ] );
    const tonic = tonics[ Math.floor( Math.random() * tonics.length ) ];
    const chordTypes = Object.keys( configuration.type ).filter( type => configuration.type[ type ] );
    const chordType = chordTypes[ Math.floor( Math.random() * chordTypes.length ) ];
    const canonicChord = Chord.getChord( chordType, tonic, tonic );
    const inversions = Object.keys( configuration.inversion ).filter( inversion => configuration.inversion[ inversion ] && parseInt( inversion ) < canonicChord.notes.length );
    const inversion = inversions[ Math.floor( Math.random() * inversions.length ) ];
    const root = canonicChord.notes[ inversion ];
    const chord3 = Chord.getChord( chordType, tonic + 3, root + 3 );
    const chord = Midi.toMidi( chord3.notes[ 0 ] ) >= 52 ? chord3
        : Chord.getChord( chordType, tonic + 4, root + 4 );

    const { Symbol, OtherSymbols } = chords[ chordType ];
    return {
        ...chord,
        Symbol: () => <Symbol root={ root } tonic={ tonic }/>,
        OtherSymbols: () => <OtherSymbols root={ root } tonic={ tonic }/>,
        midiNotes: chord.notes.map( Midi.toMidi )
    };
    
};