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

const App = () => {

    const [ chord, setChord ] = useState( generateChord( initialConfiguration ) );
    return <ConfigurationProvider>
        <Menu/>
        <Session setChord={ setChord }/>
        <Stave chord={ chord.notes }/>
        <chord.Symbol/> 
        <chord.OtherSymbols/>
        <Keyboard chord={ chord.midiNotes }/>
    </ConfigurationProvider>;
}

render( <App/>, document.getElementById( "app" ) );