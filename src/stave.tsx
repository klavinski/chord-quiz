import * as React from "react";
import { useEffect, useRef } from "react";
import Vex from "vexflow";
const VF = Vex.Flow;

export const Stave = ( { chord }: { chord: string[] }) => {

    const div = useRef<HTMLDivElement>();
    useEffect( () => {

        const VF = Vex.Flow;
        const renderer = new VF.Renderer( div.current, VF.Renderer.Backends.SVG );
        const vf = new VF.Factory( { renderer });
        const score = vf.EasyScore();
        const system = vf.System();
        system.addStave( {
        voices: [ score.voice( score.notes( "(" + chord.join( " " ) + ")/w" ), {} ) ]
        } ).addClef( "treble" );
        vf.draw();
        return () => { div.current.innerHTML = "" };

    }, [ chord ] );
    return <div ref={ div }/>;
}