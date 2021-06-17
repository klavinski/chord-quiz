import * as React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { Chord }from "@tonaljs/tonal";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import { Stave } from "./stave";
import { chords, major3, minor3 } from "./chordTable";

export const TriadMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ {
            gridTemplateColumns: "repeat( 15, 1fr )",
            gridTemplateRows: "auto",
            boxShadow: "rgba( 0, 0, 0, .2 ) 0px 0px 1rem",
            padding: "2vmin",
            borderRadius: "2vmin",
            backgroundColor: "white"
        } }
    >
        <div
            style={ { gridArea:"1 / 1 / span 1 / span 3" } }
        >
            MAJOR<br/>3 notes
        </div>
        <Button
            gridArea="1 / 4 / span 1 / span 4"
            onClick={ () => setConfiguration( { ...configuration, type: { ...configuration.type, ...Object.fromEntries( Object.keys( { ...major3, ...minor3 } ).map( type => [ type, false ] ) ), maj: true } } ) }
        >
            RESET
        </Button>
        <Button
            gridArea="1 / 8 / span 1 / span 4"
            onClick={ () => setConfiguration( { ...configuration, type: { ...configuration.type, ...Object.fromEntries( Object.keys( {...major3, ...minor3 } ).map( type => [ type, true ] ) ) } } ) }
        >
            ALL
        </Button>
        <Button
            gridArea="1 / 12 / span 1 / span 4"
            onClick={ () => console.log( tooltip.current.hideTooltip() ) }
        >
            DONE
        </Button>
        <div
            style={ { gridArea: "2 / 1 / span 1 / span 3" } }
        >
            Symbol (with C)
        </div>
        <div
            style={ { gridArea: "3 / 1 / span 1 / span 3" } }
        >
            Example (with C)
        </div>
        <div
            style={ { gridArea: "4 / 1 / span 1 / span 3" } }
        >
            Other used symbols
        </div>
        {
            Object.keys( major3 ).map( ( chordType, i ) => {
                const { Symbol, OtherSymbols } = chords[ chordType ];
            return <>
                <div
                    style={ { gridArea: `2 / ${ 4 + 3 * i } / span 1 / span 3` } }
                >
                    <Symbol root="C" tonic="C"/>
                </div>
                <div
                    style={ { gridArea: `3 / ${ 4 + 3 * i } / span 1 / span 3` } }
                >
                    <Stave chord={ Chord.getChord( chordType, "C4", "C4" ).notes }/>
                </div>
                <div
                    style={ { gridArea: `4 / ${ 4 + 3 * i } / span 1 / span 3` } }
                >
                    <OtherSymbols root="C" tonic="C"/>
                </div>
            </> } )
        }
    </div> }>{
        children
    }</Tooltip>;
}