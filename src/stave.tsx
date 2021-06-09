import * as React from "react";
import { useEffect, useRef } from "react";
import Vex from "vexflow";
const VF = Vex.Flow;

export const Stave = () => {

    const div = useRef<HTMLDivElement>();
    useEffect( () => {

        const renderer = new VF.Renderer( div.current, VF.Renderer.Backends.SVG );
        renderer.resize( 120, 200 );
        const context = renderer.getContext();
        const stave = new VF.Stave( 0, 0, 110 );
        stave.addClef( "treble" );
        stave.setContext(context).draw();

        const notes = new VF.StaveNote( { clef: "treble", keys: [ "c/4", "e/4", "e/4", "g/4" ], duration: "w" } )
            .addAccidental( 1, new VF.Accidental( "b" ) );
        const voice = new VF.Voice( {} );
        voice.addTickables( [ notes ] );
        
        new VF.Formatter().joinVoices( [ voice ] ).format( [ voice ], 110 );
        
        // Render voice
        voice.draw(context, stave);
        
    }, [] );
    return <div ref={ div }/>;
}