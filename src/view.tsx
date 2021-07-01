import * as React from "react";
import { useContext, useRef } from "react";
import { Tooltip } from "react-tippy";
import { configurationContext } from "./configuration";
import { Button } from "./button";
import { Stave } from "./stave";
import { chords } from "./chordTable";
import { Keyboard } from "./keyboard";
import { useWindowSize } from "react-use";

export const ViewMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    const { Symbol, OtherSymbols } = chords.m7b5;
    const { width, height } = useWindowSize();
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 2, 1fr )" } }
    >
        <Button
            gridArea ="1 / 1 / span 1 / span 1"
            onClick={ () => setConfiguration( configuration => ( { ...configuration, showSymbol: ! configuration.showSymbol } ) ) }
            selected={ configuration.showSymbol }
        >
            <span style={ { fontSize: "2em" } }>
                <Symbol root="Bb" tonic="C"/>
            </span>
        </Button>
        <Button
            gridArea ="1 / 2 / span 2 / span 1"
            onClick={ () => setConfiguration( configuration => ( { ...configuration, showStave: ! configuration.showStave } ) ) }
            selected={ configuration.showStave }
        >
            <Stave chord={ [ "Bb3", "C4", "Eb4", "Gb4" ] }/>
        </Button>
        <Button
            gridArea ="2 / 1 / span 1 / span 1"
            onClick={ () => setConfiguration( configuration => ( { ...configuration, showOtherSymbols: ! configuration.showOtherSymbols } ) ) }
            selected={ configuration.showOtherSymbols }
        >
            <OtherSymbols root="Bb" tonic="C"/>
        </Button>
        <Button
            gridArea ="3 / 1 / span 1 / span 2"
            onClick={ () => setConfiguration( configuration => ( { ...configuration, showKeyboard: ! configuration.showKeyboard } ) ) }
            selected={ configuration.showKeyboard }
        >
            <Keyboard chord={ [] } width={ Math.min( width, height ) * .7 }/>
        </Button>
    </div>}>{
        children
    }</Tooltip>;
}