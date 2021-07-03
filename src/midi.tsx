/** This file sets up the MIDI devices, what happens when a key is pressed or released, and adds the successes and failures to the sesssion. */

import sounds from "../assets/*.ogg";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import "web-midi-api";
import { Button } from "./button";
import { generateChord } from "./chordGenerator";
import { configurationContext } from "./configuration";
import { major3, major4_1, major4_2, minor3, minor4_1, minor4_2 } from "./chordTable";
import { Icon } from "./icon";
import { StatisticsMenu } from "./statistics";

/** Checks if there is a wrong note amid the keyboard notes. Some chord notes may not be pressed. */
const isWrong = ( keyboardNotes, chordNotes ) =>
    keyboardNotes.some( keyboardNote => chordNotes.every( chordNote => keyboardNote % 12 !== chordNote % 12 ) );

/** Checks if all the chord notes are in the keyboard notes. There may be extra keyboard notes. */
const isRight = ( keyboardNotes, chordNotes ) =>
    chordNotes.every( chordNote => keyboardNotes.some( keyboardNote => chordNote % 12 === keyboardNote % 12 ) );

const play = sound => new Audio( sounds[ sound ] ).play();

export const MIDI = ( { chord, setChord } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const [ keyboard, setKeyboard ] = useState<number[]>( [] ); // Contains the midi values of the pressed keys.

    // When a key is either pressed released...
    const onMIDIMessage = event => event.data[ 0 ] === 144 && setKeyboard( keyboard => {

        const newKeyboard = event.data[ 2 ] > 0 // We add it the pressed key to keyboard.
            ? [ ...keyboard.filter( note => note !== event.data[ 1 ] ), event.data[ 1 ] ]
            : keyboard.filter( note => note !== event.data[ 1 ] );

        console.debug( newKeyboard );

        if ( event.data[ 2 ] > 0 && configuration.sound ) // We play a sound if required.
            if ( isWrong( newKeyboard, chord.midiNotes ) )
                play( "wrong" );
            else if ( isRight( newKeyboard, chord.midiNotes ) )
                play( "right" );
        
        // If the chord is either right or wrong, we add the result to configuration.session and move onto the next chord.
        if ( ( isWrong( newKeyboard, chord.midiNotes ) || isRight( newKeyboard, chord.midiNotes ) ) && configuration.time === "MIDI" && configuration.activeSession ) {
            try {
                const { lastChordIndex, ...newChord } = generateChord( configuration );
                setKeyboard( [] );
                setChord( newChord );
                setConfiguration( configuration => ( { ...configuration, lastChordIndex, session: [ ...configuration.session, {
                    tonic: Object.values( configuration.tonic ).filter( isTrue => isTrue ).length,
                    chord3: Object.entries( configuration.type ).filter( ( [ key, value ] ) => ( key in major3 || key in minor3 ) && value ).length,
                    chord4: Object.entries( configuration.type ).filter( ( [ key, value ] ) => ( key in major4_1 || key in major4_2 || key in minor4_1 || key in minor4_2 ) && value ).length,
                    inversion: configuration.inversion[ 1 ] || configuration.inversion[ 2 ] || configuration.inversion[ 3 ],
                    success: isRight( newKeyboard, chord.midiNotes )
                } ] } ) );
            } catch( e ) {
                console.error( "Invalid chord configuration selected." );
            }
        }
        return newKeyboard;
        
    } );

    useEffect( () => {
        navigator.requestMIDIAccess().then( MIDIAccess => {

            MIDIAccess.inputs.forEach( input => input.onmidimessage = onMIDIMessage );
            MIDIAccess.onstatechange = connection => {

                if ( connection.port.type === "input" && connection.port.state === "connected" )
                    connection.port.onmidimessage = onMIDIMessage;
                
                // When all MIDI devices are disconnected, we set the time configuration to manual.
                if ( MIDIAccess.inputs.size === 0 )
                    setConfiguration( configuration => ( {
                        ...configuration,
                        time: configuration.time === "MIDI" ? "M" : configuration.time
                } ) );
            };

        } );

    }, [ configuration ] );

    return <>
        <Button
            gridArea="sound"
            onClick={ () => setConfiguration( configuration => ( { ...configuration, sound: ! configuration.sound } ) ) }
            selected={ configuration.sound }
        >
            <Icon type="music"/>
        </Button>
        <div style={ { gridArea: "check" } }>
            <Icon type={ isWrong( keyboard, chord.midiNotes ) ? "error" : isRight( keyboard, chord.midiNotes ) ? "correct" : "circle" }/>
        </div><div className="center" style={ { gridArea: "score" } }>{ 
            configuration.activeSession && configuration.session.length > 0 &&
            ( configuration.session.filter( chord => chord.success ).length / configuration.session.length * 100 ).toFixed() + " %"
        }</div>
        <div style={ { gridArea: "statistics" } }>
            <StatisticsMenu>
                <Button><Icon type="chart"/></Button>
            </StatisticsMenu>
        </div>
    </>;
}