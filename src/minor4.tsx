import * as React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { Chord }from "@tonaljs/tonal";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import { Stave } from "./stave";
import { chords, minor4_1, minor4_2 } from "./chordTable";

export const Minor4Menu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ {
            gridTemplateColumns: "repeat( 4, 1fr )",
            boxShadow: "rgba( 0, 0, 0, .2 ) 0px 0px 1rem",
            padding: "2vmin",
            borderRadius: "2vmin",
            backgroundColor: "white",
            maxHeight: "calc( 100vh - 25vmin )",
            maxWidth: "calc( 100vw - 7vmin )",
            overflow: "auto"
        } }
    >
        <div
            style={ { gridArea:"1 / 1 / span 1 / span 1" } }
        >
            minor<br/>4 notes
        </div>
        <Button
            gridArea="1 / 2 / span 1 / span 1"
            onClick={ () => setConfiguration( { ...configuration, type: { ...configuration.type, ...Object.fromEntries( Object.keys( { ...minor4_1, ...minor4_2 } ).map( type => [ type, initialConfiguration.type[ type ] ] ) ), M: configuration.type.M || Object.keys( configuration.type ).filter( type => configuration.type[ type ] ).every( type => Object.keys( minor4_1 ).includes( type ) || Object.keys( minor4_2 ).includes( type ) ) } } ) }
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
                    style={ { gridArea: `2 / ${ 1 + i } / span 1 / span 1` } }
                >
                    <Button
                        onClick={ ( ! configuration.type[ chordType ] || Object.values( configuration.type ).filter( type => type ).length > 1 ) && ( () => setConfiguration( configuration => ( { ...configuration, type: { ...configuration.type, [ chordType ]: ! configuration.type[ chordType ] } } ) ) ) }
                        selected={ configuration.type[ chordType ] }
                    >
                        <Symbol root="C" tonic="C"/>
                    </Button>
                </div>
                <div
                    style={ { gridArea: `3 / ${ 1 + i } / span 1 / span 1` } }
                >
                    <Stave chord={ Chord.getChord( chordType, "C4", "C4" ).notes }/>
                </div>
                <div
                    style={ { gridArea: `4 / ${ 1 + i } / span 1 / span 1` } }
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
                    style={ { gridArea: `6 / ${ 1 + i } / span 1 / span 1` } }
                >
                    <Button
                        onClick={ ( ! configuration.type[ chordType ] || Object.values( configuration.type ).filter( type => type ).length > 1 ) && ( () => setConfiguration( configuration => ( { ...configuration, type: { ...configuration.type, [ chordType ]: ! configuration.type[ chordType ] } } ) ) ) }
                        selected={ configuration.type[ chordType ] }
                    >
                        <Symbol root="C" tonic="C"/>
                    </Button>
                </div>
                <div
                    style={ { gridArea: `7 / ${ 1 + i } / span 1 / span 1` } }
                >
                    <Stave chord={ Chord.getChord( chordType, "C4", "C4" ).notes }/>
                </div>
                <div
                    style={ { gridArea: `8 / ${ 1 + i } / span 1 / span 1` } }
                >
                    <OtherSymbols root="C" tonic="C"/>
                </div>
            </> } )
        }
    </div> }>{
        children
    }</Tooltip>;
}