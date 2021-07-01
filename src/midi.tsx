import * as React from "react";
import { useContext, useEffect, useState } from "react";
import "web-midi-api";
import { configurationContext } from "./configuration";
import { Icon } from "./icon";
import { Tooltip } from "react-tippy";
import { Button } from "./button";
import sounds from "../assets/*.ogg";
import { generateChord } from "./chordGenerator";
import { StatisticsMenu } from "./statistics";
import { major3, major4_1, major4_2, minor3, minor4_1, minor4_2 } from "./chordTable";

const isWrong = ( keyboardNotes, chordNotes ) =>
    keyboardNotes.some( keyboardNote => chordNotes.every( chordNote => keyboardNote % 12 !== chordNote % 12 ) );

const isRight = ( keyboardNotes, chordNotes ) =>
    chordNotes.every( chordNote => keyboardNotes.some( keyboardNote => chordNote % 12 === keyboardNote % 12 ) );

const play = sound => {

    const audio = new Audio( sounds[ sound ] );
    audio.play();

};

export const MIDI = ( { chord, setChord } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const [ keyboard, setKeyboard ] = useState( [] );

    const onMIDIMessage = event => event.data[ 0 ] === 144 && setKeyboard( keyboard => {

        const newKeyboard = event.data[ 2 ] > 0
            ? [ ...keyboard.filter( note => note !== event.data[ 1 ] ), event.data[ 1 ] ]
            : keyboard.filter( note => note !== event.data[ 1 ] );

        console.debug( newKeyboard );

        if ( event.data[ 2 ] > 0 && configuration.sound )
            if ( isWrong( newKeyboard, chord.midiNotes ) )
                play( "wrong" );
            else if ( isRight( newKeyboard, chord.midiNotes ) )
                play( "right" );
        if ( ( isWrong( newKeyboard, chord.midiNotes ) || isRight( newKeyboard, chord.midiNotes ) ) && configuration.time === "MIDI" && Array.isArray( configuration.session ) ) {
            try {
                const { lastChordIndex, ...newChord } = generateChord( configuration );
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
        </div><div style={ { gridArea: "score" } }>{ 
            Array.isArray( configuration.session ) && configuration.session.length > 0 &&
            ( configuration.session.filter( chord => chord.success ).length / configuration.session.length * 100 ).toFixed() + " %"
        }</div>
        <div style={ { gridArea: "statistics" } }>
            <StatisticsMenu>
                <Button><Icon type="chart"/></Button>
            </StatisticsMenu>
        </div>
    </>;
}