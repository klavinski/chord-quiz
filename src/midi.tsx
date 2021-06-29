import * as React from "react";
import { useContext, useEffect, useState } from "react";
import "web-midi-api";
import { configurationContext } from "./configuration";
import { Icon } from "./icon";
import { Tooltip } from "react-tippy";
import { Button } from "./button";
import sounds from "../assets/*.ogg";
import { generateChord } from "./chordGenerator";

const isWrong = ( keyboard, chord ) =>
    keyboard.some( keyboardNote => chord.every( chordNote => keyboardNote % 12 !== chordNote % 12 ) );

const isRight = ( keyboard, chord ) =>
    chord.every( chordNote => keyboard.some( keyboardNote => chordNote % 12 === keyboardNote % 12 ) );

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
            if ( isWrong( keyboard, chord ) )
                play( "wrong" );
            else if ( isRight( keyboard, chord ) )
                play( "right" );
        if ( ( isWrong( keyboard, chord ) || isRight( keyboard, chord ) ) && configuration.time === "MIDI" ) {
            try {
                const { lastLearnChordIndex, ...chord } = generateChord( configuration );
                setChord( chord );
                setConfiguration( configuration => ( { ...configuration, lastLearnChordIndex } ) );
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
            onClick={ () => setConfiguration( configuration => ( { ...configuration, sound: ! configuration.sound } ) ) }
            selected={ configuration.sound }
        >
            <Icon type="music"/>
        </Button>
        <Icon type={ isWrong( keyboard, chord ) ? "wrong" : isRight( keyboard, chord ) ? "right" : "circle" }/>
        0%
        <Tooltip trigger="click" html={
            <div
            className="grid"
            >
                Statistics: to be completed
            </div>
        }>
            <Button><Icon type="chart"/></Button>
        </Tooltip>
    </>;
}