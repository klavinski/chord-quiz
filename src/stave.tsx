import * as React from "react";
import { useEffect, useRef } from "react";
import Vex from "vexflow";


export const Stave = ( { chord, zoom }: { chord: string[], zoom?: number } ) => {

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
        div.current.querySelector( "svg" ).style.width = ( zoom ?? 1 ) * 30 + "vmin";
        div.current.querySelector( "svg" ).style.height = ( zoom ?? 1 ) * 30 + "vmin";
        return () => { div.current.innerHTML = "" };

    }, [ chord ] );
    return <div ref={ div }/>;
}