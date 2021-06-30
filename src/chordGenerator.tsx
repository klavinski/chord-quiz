import { Chord, Midi } from "@tonaljs/tonal";
import * as React from "react";
import { initialConfiguration } from "./configuration";
import { chords, major3, minor3 } from "./chordTable";

export const allChords = Object.keys( initialConfiguration.tonic ).flatMap( tonic => Object.keys( initialConfiguration.type ).flatMap( type => Object.keys( initialConfiguration.inversion ).map( inversion => ( { tonic, type, inversion } ) ) ) ).filter( ( { type, inversion } ) => ! ( inversion === "3" && ( type in major3 || type in minor3 ) ) );

const generateNextChord = ( configuration ) => {

    const nextChords = allChords.slice( configuration.lastChordIndex + 1 );
    const previousChords = allChords.slice( 0, configuration.lastChordIndex + 1 );
    const currentChordIndex = ( [ ...nextChords, ...previousChords ].findIndex( ( { tonic, type, inversion } ) => configuration.tonic[ tonic ] && configuration.type[ type ] && configuration.inversion[ inversion ] ) + configuration.lastChordIndex + 1 ) % allChords.length;
    return { ...allChords[ currentChordIndex ], currentChordIndex };

};

const generateRandomChord = ( configuration ) => {

    const tonics = Object.keys( configuration.tonic ).filter( note => configuration.tonic[ note ] );
    const tonic = tonics[ Math.floor( Math.random() * tonics.length ) ];
    const types = Object.keys( configuration.type ).filter( type => configuration.type[ type ] );
    const type = types[ Math.floor( Math.random() * types.length ) ];
    const chord = Chord.getChord( type, tonic, tonic );
    const inversions = Object.keys( configuration.inversion ).filter( inversion => configuration.inversion[ inversion ] && ( chord.notes.length === 4 || inversion !== "3" ) );
    const inversion = inversions[ Math.floor( Math.random() * inversions.length ) ];
    const currentChordIndex = allChords.findIndex( ( { tonic, type, inversion } ) => configuration.tonic[ tonic ] && configuration.type[ type ] && configuration.inversion[ inversion ] );
    return { tonic, type, inversion, currentChordIndex };

}

export const generateChord = ( configuration: typeof initialConfiguration ) => {

    const { tonic, type, inversion, currentChordIndex } = ( configuration.learn ) ?
        generateNextChord( configuration ) : generateRandomChord( configuration );
    const notes = Chord.getChord( type, tonic + 3, tonic + 3 ).notes.map( Midi.toMidi );
    const notesBeforeRoot = notes.slice( parseInt( inversion ) );
    const notesAfterRoot = notes.slice( 0, parseInt( inversion ) );
    const invertedNotes = [ ...notesBeforeRoot, ...notesAfterRoot.map( note => note + 12 ) ];
    const root = Chord.getChord( type, tonic, tonic).notes[ inversion ];
    const averageNote = ( invertedNotes[ 0 ] + invertedNotes[ invertedNotes.length - 1 ] ) / 2;
    const transposedNotes = invertedNotes.map( note => note + Math.round( ( 64 - averageNote ) / 12 ) * 12 );
    const { Symbol, OtherSymbols } = chords[ type ];
    return {
        notes: transposedNotes.map( note => Midi.midiToNoteName( note ) ),
        Symbol: () => <Symbol root={ root } tonic={ tonic }/>,
        OtherSymbols: () => <OtherSymbols root={ root } tonic={ tonic }/>,
        midiNotes: transposedNotes,
        lastChordIndex: currentChordIndex,
        inversion
    };
    
};