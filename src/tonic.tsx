import * as React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { Key, Note } from "@tonaljs/tonal";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";

export const TonicMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        style={ {
            display: "grid",
            gridTemplateColumns: "repeat( 6, 1fr )",
            gridTemplateRows: "auto",
    } }
    >
        <Button
            gridArea="1 / 1 / span 1 / span 3"
            onClick={ () => setConfiguration( { ...configuration, tonic: Object.fromEntries( Object.keys( configuration.tonic ).map( note => [ note, true ] ) ) } ) }
        >
            ALL
        </Button>
        <Button
            gridArea="1 / 4 / span 1 / span 3"
            onClick={ () => setConfiguration( { ...configuration, tonic: initialConfiguration.tonic } ) }
        >
            RESET
        </Button>{
            Key.minorKey( "A" ).natural.scale.map( ( note, i ) => <>
                <Button
                    gridArea={ i + 2 + " / 1 / span 1 / span 2" }
                    key={ note }
                    onClick={ () => setConfiguration( { ...configuration, tonic: { ...configuration.tonic, [ note ]: ! configuration.tonic[ note ] } } ) }
                    selected={ configuration.tonic[ note ] }
                >{
                    note
                }</Button>
                { note + "b" === Note.simplify( note + "b" ) &&
                <Button
                    gridArea={ i + 2 + " / 3 / span 1 / span 2" }
                    key={ note + "b" }
                    onClick={ () => setConfiguration( { ...configuration, tonic: { ...configuration.tonic, [ note + "b" ]: ! configuration.tonic[ note + "b" ] } } ) }
                    selected={ configuration.tonic[ note + "b" ] }
                >{
                    note + "♭"
                }</Button>
                } { note + "#" === Note.simplify( note + "#" ) &&
                <Button
                    gridArea={ i + 2 + " / 5 / span 1 / span 2" }
                    key={ note + "#" }
                    onClick={ () => setConfiguration( { ...configuration, tonic: { ...configuration.tonic, [ note + "#" ]: ! configuration.tonic[ note + "#" ] } } ) }
                    selected={ configuration.tonic[ note + "#" ] }
                >{
                    note + "♯"
                }</Button>
            }</> )
        }
        <Button
            gridArea="9 / 1 / span 1 / span 6"
            onClick={ () => console.log( tooltip.current.hideTooltip() ) }
        >
            DONE
        </Button>
    </div> }>{
        children
    }</Tooltip>;
}