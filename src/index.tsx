import "./style.css";

import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { render } from "react-dom";
import { configurationContext, ConfigurationProvider, initialConfiguration } from "./configuration";
import { generateChord } from "./chordGenerator";
import { Keyboard } from "./keyboard";
import { Stave } from './stave';
import { Menu } from "./menu";

const ChordResetter = ( { setChord } ) => {

    const [ configuration ] = useContext( configurationContext );
    useEffect( () => {
        const resetChord = setInterval( () => setChord( generateChord( configuration ) ), configuration.time * 1000 );
        return () => clearInterval( resetChord );
    }, [ configuration ] );
    return <></>;
}

const App = () => {

    const [ chord, setChord ] = useState( generateChord( initialConfiguration ) );
    return <ConfigurationProvider>
        <ChordResetter setChord={ setChord }/>
        <Menu/>
        <Stave chord={ chord.notes }/>
        <chord.Symbol/> 
        <chord.OtherSymbols/>
        <Keyboard chord={ chord.midiNotes }/>
    </ConfigurationProvider>;
}

render( <App/>, document.getElementById( "app" ) );