import * as React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { Chord }from "@tonaljs/tonal";
import { configurationContext } from "./configuration";
import { Button } from "./button";
import { Stave } from "./stave";
import { chords } from "./chordTable";

export const Dim4Menu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const { Symbol, OtherSymbols } = chords.dim7;
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 2, 1fr )" } }
    >
        <div
            style={ { gridArea:"1 / 1 / span 1 / span 1" } }
        >
            Diminished<br/>4 notes
        </div>
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
        <div
            style={ { gridArea: `2 / 2 / span 1 / span 1` } }
        >
            <Button
                onClick={ () => setConfiguration( configuration => ( { ...configuration, type: { ...configuration.type, dim7: ! configuration.type.dim7 } } ) ) }
                selected={ configuration.type.dim7 }
            >
                <Symbol root="C" tonic="C"/>
            </Button>
        </div>
        <div
            style={ { gridArea: `3 / 2 / span 1 / span 1` } }
        >
            <Stave chord={ Chord.getChord( "dim7", "C4", "C4" ).notes }/>
        </div>
        <div
            style={ { gridArea: `4 / 2 / span 1 / span 1` } }
        >
            <OtherSymbols root="C" tonic="C"/>
        </div>
    </div> }>{
        children
    }</Tooltip>;
}