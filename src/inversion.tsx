import * as React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { Stave } from "./stave";
import { Chord } from "@tonaljs/tonal";
import { configurationContext, initialConfiguration } from "./configuration";
import { Button } from "./button";
import { chords } from "./chordTable";

export const InversionMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ {
            gridTemplateColumns: "repeat( 15, 1fr )",
            boxShadow: "rgba( 0, 0, 0, .2 ) 0px 0px 1rem",
            padding: "2vmin",
            borderRadius: "2vmin",
            backgroundColor: "white"
        } }
    >
        <Button
            gridArea="1 / 4 / span 1 / span 4"
            onClick={ () => setConfiguration( { ...configuration, inversion: Object.fromEntries( Object.keys( configuration.inversion ).map( inversion => [ inversion, true ] ) ) } ) }
        >
            ALL
        </Button>
        <Button
            gridArea="1 / 8 / span 1 / span 4"
            onClick={ () => setConfiguration( { ...configuration, inversion: initialConfiguration.inversion } ) }
        >
            RESET
        </Button>
        <Button
            gridArea="1 / 12 / span 1 / span 4"
            onClick={ () => tooltip.current.hideTooltip() }
        >
            DONE
        </Button>
        <div
            style={ { gridArea: "2 / 1 / span 1 / span 3" } }
        >
            Inversions
        </div>
        <div
            style={ { gridArea: "3 / 1 / span 1 / span 3" } }
        >
            Example (with C<sup>7</sup>)
        </div>
        <div
            style={ { gridArea: "4 / 1 / span 1 / span 3" } }
        >
            Symbol (with C<sup>7</sup>)
        </div>{
            Object.keys( configuration.inversion ).map( inversion => <>
                <Button
                    key={ "label" + inversion }
                    gridArea={ "2 / " + ( 4 + parseInt( inversion ) * 3 ) + " / span 1 / span 3" }
                    onClick={ () => ( ! configuration.inversion[ inversion ] || Object.values( configuration.inversion ).filter( inversion => inversion ).length > 1 ) && setConfiguration( { ...configuration, inversion: { ...configuration.inversion, [ inversion ]: ! configuration.inversion[ inversion ] } } ) }
                    selected={ configuration.inversion[ inversion ] }
                >
                    { [ <>Fundamental state</>, <>1<sup>st</sup> inversion</>, <>2<sup>nd</sup> inversion</>, <span>3<sup>rd</sup> (4 notes only)</span> ][ inversion ] }
                </Button>
                <div
                    key={ "stave" + inversion }
                    style={ { gridArea: "3 / " + ( 4 + parseInt( inversion ) * 3 ) + " / span 1 / span 3" } }
                >
                    <Stave chord={ Chord.getChord( "7", "C4", [ "C", "E", "G", "Bb" ][ inversion ] + 4 ).notes }/>
                </div>
                <div
                    key={ "symbol" + inversion }
                    style={ { gridArea: "4 / " + ( 4 + parseInt( inversion ) * 3 ) + " / span 1 / span 3" } }
                >
                    <chords.M7.Symbol root={ [ "C", "E", "G", "Bb" ][ inversion ] } tonic="C"/>
                </div>
            </> )
        }
    </div> }>{
        children
    }</Tooltip>;
}