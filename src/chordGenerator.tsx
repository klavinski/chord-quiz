import { Chord, Midi }from "@tonaljs/tonal";
import * as React from "react";
import { initialConfiguration } from "./configuration";
import { chords, major3, minor3 } from "./chordTable";

const allChords = Object.keys( initialConfiguration.tonic ).flatMap( tonic => Object.keys( initialConfiguration.type ).flatMap( type => Object.keys( initialConfiguration.inversion ).map( inversion => ( { tonic, type, inversion } ) ) ) ).filter( ( { type, inversion } ) => ! ( inversion === "3" && ( type in major3 || type in minor3 ) ) );

const generateNextChord = ( configuration ) => {

    const nextChords = allChords.slice( configuration.lastLearnChordIndex + 1 );
    const previousChords = allChords.slice( 0, configuration.lastLearnChordIndex + 1 );
    const currentLearnChordIndex = ( [ ...nextChords, ...previousChords ].findIndex( ( { tonic, type, inversion } ) => configuration.tonic[ tonic ] && configuration.type[ type ] && configuration.inversion[ inversion ] ) + configuration.lastLearnChordIndex + 1 ) % allChords.length;
    console.log( { ...allChords[ currentLearnChordIndex ], currentLearnChordIndex } );
    return { ...allChords[ currentLearnChordIndex ], currentLearnChordIndex };

};

const generateRandomChord = ( configuration ) => {

    const tonics = Object.keys( configuration.tonic ).filter( note => configuration.tonic[ note ] );
    const tonic = tonics[ Math.floor( Math.random() * tonics.length ) ];
    const types = Object.keys( configuration.type ).filter( type => configuration.type[ type ] );
    const type = types[ Math.floor( Math.random() * types.length ) ];
    const canonicChord = Chord.getChord( type, tonic, tonic );
    const inversions = Object.keys( configuration.inversion ).filter( inversion => configuration.inversion[ inversion ] && parseInt( inversion ) < canonicChord.notes.length );
    const inversion = inversions[ Math.floor( Math.random() * inversions.length ) ];
    return { tonic, type, inversion, currentLearnChordIndex: configuration.lastLearnChordIndex };

}

export const generateChord = ( configuration: typeof initialConfiguration, setConfiguration ) => {
    
    const { tonic, type, inversion, currentLearnChordIndex } = ( typeof configuration.lastLearnChordIndex === "number" ) ?
        generateNextChord( configuration ) : generateRandomChord( configuration );
    setConfiguration( { ...configuration, lastLearnChordIndex: currentLearnChordIndex } );
    const root = Chord.getChord( type, tonic, tonic ).notes[ inversion ];
    const chord3 = Chord.getChord( type, tonic + 3, root + 3 );
    const averageNote = ( Midi.toMidi( chord3.notes[ 0 ] ) + Midi.toMidi( chord3.notes[ chord3.notes.length - 1 ] ) ) / 2;
    const chord = Math.abs( averageNote - 64 ) <= Math.abs( averageNote + 12 - 64 ) ? chord3
        : Chord.getChord( type, tonic + 4, root + 4 );

    const { Symbol, OtherSymbols } = chords[ type ];
    return {
        ...chord,
        Symbol: () => <Symbol root={ root } tonic={ tonic }/>,
        OtherSymbols: () => <OtherSymbols root={ root } tonic={ tonic }/>,
        midiNotes: chord.notes.map( Midi.toMidi )
    };
    
};