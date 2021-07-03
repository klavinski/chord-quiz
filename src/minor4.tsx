import { Chord }from "@tonaljs/tonal";
import * as React from "react";
import { useContext, useRef } from "react";
import { Tooltip } from "react-tippy";
import { Button } from "./button";
import { chords, minor4_1, minor4_2 } from "./chordTable";
import { configurationContext, initialConfiguration } from "./configuration";
import { Stave } from "./stave";

export const Minor4Menu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 4, 1fr )" } }
    >
        <div
            style={ { gridArea:"1 / 1 / span 1 / span 1" } }
        >
            minor<br/>4 notes
        </div>
        <Button
            gridArea="1 / 2 / span 1 / span 1"
            onClick={ () => setConfiguration( { ...configuration, type: { ...configuration.type, ...Object.fromEntries( Object.keys( { ...minor4_1, ...minor4_2 } ).map( type => [ type, initialConfiguration.type[ type ] ] ) ) } } ) }
        >
            RESET
        </Button>
        <Button
            gridArea="1 / 3 / span 1 / span 1"
            onClick={ () => setConfiguration( { ...configuration, type: { ...configuration.type, ...Object.fromEntries( Object.keys( { ...minor4_1, ...minor4_2 } ).map( type => [ type, true ] ) ) } } ) }
        >
            ALL
        </Button>
        <Button
            gridArea="1 / 4 / span 1 / span 1"
            onClick={ () => console.log( tooltip.current.hideTooltip() ) }
        >
            DONE
        </Button>
        <div
            style={ { gridArea: "2 / 1 / span 1 / span 1" } }
        >
            Symbol (with C)
        </div>
        <div
            style={ { gridArea: "3 / 1 / span 1 / span 1" } }
        >
            Example (with C)
        </div>
        <div
            style={ { gridArea: "4 / 1 / span 1 / span 1" } }
        >
            Other used symbols
        </div>
        {
            Object.keys( minor4_1 ).map( ( chordType, i ) => {
                const { Symbol, OtherSymbols } = chords[ chordType ];
            return <>
                <div
                    style={ { gridArea: `2 / ${ 2 + i } / span 1 / span 1` } }
                >
                    <Button
                        onClick={ () => setConfiguration( configuration => ( { ...configuration, type: { ...configuration.type, [ chordType ]: ! configuration.type[ chordType ] } } ) ) }
                        selected={ configuration.type[ chordType ] }
                    >
                        <Symbol root="C" tonic="C"/>
                    </Button>
                </div>
                <div
                    style={ { gridArea: `3 / ${ 2 + i } / span 1 / span 1` } }
                >
                    <Stave chord={ Chord.getChord( chordType, "C4", "C4" ).notes }/>
                </div>
                <div
                    style={ { gridArea: `4 / ${ 2 + i } / span 1 / span 1` } }
                >
                    <OtherSymbols root="C" tonic="C"/>
                </div>
            </> } )
        }
        <div style={ { gridArea:"5 / 1 / span 1 / span 4" } }> </div>
        <div
            style={ { gridArea: "6 / 1 / span 1 / span 1" } }
        >
            Symbol (with C)
        </div>
        <div
            style={ { gridArea: "7 / 1 / span 1 / span 1" } }
        >
            Example (with C)
        </div>
        <div
            style={ { gridArea: "8 / 1 / span 1 / span 1" } }
        >
            Other used symbols
        </div>
        {
            Object.keys( minor4_2 ).map( ( chordType, i ) => {
                const { Symbol, OtherSymbols } = chords[ chordType ];
            return <>
                <div
                    style={ { gridArea: `6 / ${ 2 + i } / span 1 / span 1` } }
                >
                    <Button
                        onClick={ () => setConfiguration( configuration => ( { ...configuration, type: { ...configuration.type, [ chordType ]: ! configuration.type[ chordType ] } } ) ) }
                        selected={ configuration.type[ chordType ] }
                    >
                        <Symbol root="C" tonic="C"/>
                    </Button>
                </div>
                <div
                    style={ { gridArea: `7 / ${ 2 + i } / span 1 / span 1` } }
                >
                    <Stave chord={ Chord.getChord( chordType, "C4", "C4" ).notes }/>
                </div>
                <div
                    style={ { gridArea: `8 / ${ 2 + i } / span 1 / span 1` } }
                >
                    <OtherSymbols root="C" tonic="C"/>
                </div>
            </> } )
        }
    </div> }>{
        children
    }</Tooltip>;
}