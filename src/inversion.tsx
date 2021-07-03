import { Chord } from "@tonaljs/tonal";
import * as React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { Button } from "./button";
import { chords } from "./chordTable";
import { configurationContext, initialConfiguration } from "./configuration";
import { Stave } from "./stave";

/** Some text does not appear on small screens. We truncate the overflowing characters this style. */
const ellipsis = { overflow: "hidden", textOverflow: "ellipsis" };

export const InversionMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 15, 1fr )" } }
    >
        <Button
            gridArea="1 / 4 / span 1 / span 4"
            onClick={ () => setConfiguration( { ...configuration, inversion: { 0: true, 1: true, 2: true, 3: true } } ) }
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
                    onClick={ () => setConfiguration( configuration => ( { ...configuration, inversion: { ...configuration.inversion, [ inversion ]: ! configuration.inversion[ inversion ] } } ) ) }
                    selected={ configuration.inversion[ inversion ] }
                >
                    { [
                        <span style={ ellipsis }>Fundamental state</span>,
                        <span style={ ellipsis }>1<sup>st</sup> inversion</span>,
                        <span style={ ellipsis }>2<sup>nd</sup> inversion</span>,
                        <span style={ ellipsis }>3<sup>rd</sup> (4 notes only)</span>
                    ][ inversion ] }
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