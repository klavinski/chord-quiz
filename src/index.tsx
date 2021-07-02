import "./style.css";
import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import {  ConfigurationProvider, initialConfiguration } from "./configuration";
import { generateChord } from "./chordGenerator";
import { Keyboard } from "./keyboard";
import { Stave } from './stave';
import { Menu } from "./menu";
import { Session } from "./session";
import { MIDI } from "./midi";
import { useWindowSize } from "react-use";

const App = () => {

    const [ chord, setChord ] = useState( () => generateChord( initialConfiguration ) );
    const { width, height } = useWindowSize();
    return <ConfigurationProvider>
        <Menu/>
        <div
            style={ {
                display: "grid",
                gap: "2vmin",
                gridTemplateAreas: `
                'start start timer timer . sound        statistics   check        score        symbol symbol'
                'next  next  timer timer . otherSymbols otherSymbols otherSymbols otherSymbols symbol symbol'
                `,
                gridTemplateColumns: "repeat( 4, 10vmin ) 1fr repeat( 6, 10vmin )",
                gridTemplateRows: "repeat( 2, 10vmin )",
                padding: "1vmin"
            } }
        >
            <Session setChord={ setChord }/>
            <MIDI chord={ chord } setChord={ setChord }/>
            <div style={ {
                gridArea: "symbol",
                fontSize: "2em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            } }>
                <chord.Symbol/>
            </div>
            <div style={ {
                gridArea: "otherSymbols" } }>  
                <chord.OtherSymbols/>
            </div>
        </div>
        <Stave chord={ chord.notes } zoom={ 1.5 }/>
        <div
            style={ {
                backgroundColor: "black",
                textAlign: "center",
                position: "absolute",
                bottom: 0,
                right: 0,
            } }>
            <Keyboard chord={ chord.midiNotes } width={ Math.min( width, height ) }/>
        </div>
    </ConfigurationProvider>;
}

render( <App/>, document.getElementById( "app" ) );