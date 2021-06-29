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

const App = () => {

    const [ chord, setChord ] = useState( generateChord( initialConfiguration ) );
    return <ConfigurationProvider>
        <Menu/>
        <div
            style={ { display: "flex" } }
        >
            <Session setChord={ setChord }/>
            <MIDI chord={ chord.midiNotes } setChord={ setChord }/>
            <Stave chord={ chord.notes }/>
            <chord.Symbol/> 
            <chord.OtherSymbols/>
        </div>
        <div
            style={ {
                backgroundColor: "black",
                textAlign: "center",
                position: "absolute",
                bottom: 0,
                marginLeft: "auto"
            } }>
            <Keyboard chord={ chord.midiNotes }/>
        </div>
    </ConfigurationProvider>;
}

render( <App/>, document.getElementById( "app" ) );