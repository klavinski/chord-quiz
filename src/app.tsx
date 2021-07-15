import "./style.css";
import * as React from "react";
import { useContext, useState } from "react";
import { useWindowSize } from "react-use";
import { configurationContext, initialConfiguration } from "./configuration";
import { generateChord } from "./chordGenerator";
import { Keyboard } from "./keyboard";
import { Menu } from "./menu";
import { MIDI } from "./midi";
import { Session } from "./session";
import { Sound } from "./sound";
import { Stave } from './stave';

export const App = () => {

    const [ chord, setChord ] = useState( () => generateChord( initialConfiguration ) ); // current chord on screen
    const [ configuration ] = useContext( configurationContext );
    const { width, height } = useWindowSize();
    return <div
        style={ {
            display: "grid",
            height: "100vh",
            gap: "2vmin",
            gridTemplateAreas: width > height ? `
            'menu  menu  menu  menu  menu     menu     menu     menu         menu         menu'
            'start start timer timer .        symbol   symbol   otherSymbols sound        statistics'
            'next  next  timer timer .        symbol   symbol   otherSymbols check        score'
            'stave stave stave stave keyboard keyboard keyboard keyboard     keyboard     keyboard'
            ` : `
            'menu         menu         menu         menu         menu         menu         menu         menu         menu'
            '.            .            .            .            .            .            .            .            .'
            '.            start        start        timer        timer        .            sound        statistics   .'
            '.            next         next         timer        timer        .            check        score        .'
            '.            .            .            .            .            .            .            .            .'
            '.            .            .            .            .            stave        stave        stave        stave'
            '.            symbol       symbol       .            .            stave        stave        stave        stave'
            '.            symbol       symbol       .            .            stave        stave        stave        stave'
            '.            .            .            .            .            stave        stave        stave        stave'
            '.            .            .            .            .            .            .            .            .'
            'otherSymbols otherSymbols otherSymbols otherSymbols otherSymbols otherSymbols otherSymbols otherSymbols otherSymbols'
            '.            .            .            .            .            .            .            .            .'
            'keyboard     keyboard     keyboard     keyboard     keyboard     keyboard     keyboard     keyboard     keyboard'
            `,
            gridTemplateColumns: width > height ? "repeat( 7, 10vmin ) 1fr repeat( 2, 10vmin )" : "repeat( 4, 10vmin ) 1fr repeat( 4, 10vmin )",
            gridTemplateRows: width > height ? "10vmin repeat( 2, 10vmin ) 1fr" : "10vmin 1fr 10vmin 10vmin 1fr repeat( 4, 10vmin ) 1fr 10vmin 1fr 50vmin",
            padding: "2vmin"
        } }
    >
        <Menu/>
        <Session setChord={ setChord }/>
        <MIDI chord={ chord } setChord={ setChord }/>
        <div
            className="center" 
            style={ { gridArea: "symbol", fontSize: "2em", display: configuration.showSymbol ? "flex" : "none" } }>
            <chord.Symbol/>
        </div>
        <div className="center" style={ { gridArea: "otherSymbols", fontSize: "1.3em", display: configuration.showOtherSymbols ? "flex" : "none" } }>  
            <chord.OtherSymbols/>
        </div>
        <div className="center" style={ { gridArea: "stave", display: configuration.showStave ? "flex" : "none" } }>
            <Stave chord={ chord.notes } zoom={ 1.5 }/>
        </div>
        <div className="center" style={ { gridArea: "keyboard", display: configuration.showKeyboard ? "flex" : "none", marginLeft: width > height ? 0 : - width * .02 } }>
            <Keyboard chord={ chord.midiNotes } width={ width > height ? Math.min( width - Math.min( width, height ) * .52, ( height - Math.min( width, height ) * .4 ) * 825 / 355 ) : width }/>
        <Sound notes={ chord.notes }/>
        </div>
    </div>;
}