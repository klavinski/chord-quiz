import * as React from "react";
import { useEffect, useRef } from "react";
import { render } from "react-dom";
import Vex from "vexflow";
const VF = Vex.Flow;

export const Stave = ( { chord }: { chord: string[] } ) => {

    const div = useRef<HTMLDivElement>();
    useEffect( () => {

        const VF = Vex.Flow;
        const vf = new VF.Factory( { renderer: { elementId: div.current, width: 180, height: 150 } } );
        const score = vf.EasyScore();
        const system = vf.System();
        system.addStave( {
        voices: [ score.voice( score.notes( "(" + chord.join( " " ) + ")/w" ), {} ) ]
        } ).addClef( "treble" );
        vf.draw();
        div.current.querySelector( "svg" ).style.width = "25vmin";
        div.current.querySelector( "svg" ).style.height = "25vmin";
        return () => { div.current.innerHTML = "" };

    }, [ chord ] );
    return <div ref={ div }/>;
}