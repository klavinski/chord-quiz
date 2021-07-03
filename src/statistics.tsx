import { Storage } from "@capacitor/storage";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { Tooltip as ReactTooltip } from "react-tippy";
import { Bar, BarChart, Cell, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import "regenerator-runtime/runtime";
import { Button } from "./button";
import { configurationContext } from "./configuration";
import { Icon } from "./icon";

/** Colours for each type of configuration. */
const colors = [
    "rgb( 204, 193, 218 )",
    "rgb(  96,  74, 123 )",
    "rgb( 185, 205, 229 )",
    "rgb(  85, 142, 213 )",
    "rgb( 215, 228, 189 )",
    "rgb( 119, 147,  60 )",
    "rgb( 252, 213, 181 )",
    "rgb( 228, 108,  10 )",
    "rgb( 230, 185, 184 )",
    "rgb( 149,  55,  53 )"
];

/** Labels for each type of configuration. */
const labels = [
    "1 note – Many 3 sounds chords – No inversion",
    "1 note – Many 3 sounds chords – Inversion",
    "Many notes – 1 chord – No inversion",
    "Many notes – 1 chord – Inversion",
    "Many notes – Many 3 sounds chords – No inversion",
    "Many notes – Many 3 sounds chords – Inversion",
    "1 note – Many 3 and 4 sounds chords – No inversion",
    "1 note – Many 3 and 4 sounds chords – Inversion",
    "Many notes – Many 3 and 4 sounds chords – no inversion",
    "Many notes – Many 3 and 4 sounds chords – Inversion"
];

export const StatisticsMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration ] = useContext( configurationContext );
    const [ page, setPage ] = useState( 0 );
    const [ statistics, setStatistics ] = useState( { average: null, data: [] } );
    const { width, height } = useWindowSize();
    useEffect( () => { ( async () => {
        // We get 10 session from the storage.
        const { keys } = await Storage.keys();
        const sessions = await Promise.all( keys.sort().slice( page * 10, page * 10 + 10 ).map( key => Storage.get( { key } ).then( ( { value } ) => JSON.parse( value ) ) ) );
        // We combine them, anc compute statistics for each bar.
        const combinedChords = sessions.reduce( ( acc, cur ) => [ ...acc, ...cur ], [] );
        setStatistics( {
            average: combinedChords.length > 0 ? combinedChords.filter( ( { success } ) => success ).length / combinedChords.length * 100 : null,
            data: [
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic === 1 && chord3 > 1 && chord4 === 0 && ! inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic === 1 && chord3 > 1 && chord4 === 0 && inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic > 1 && chord3 === 1 && chord4 === 0 && ! inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic > 1 && chord3 === 1 && chord4 === 0 && inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic > 1 && chord3 > 1 && chord4 === 0 && ! inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic > 1 && chord3 > 1 && chord4 === 0 && inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic === 1 && chord4 > 0 && ! inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic === 1 && chord4 > 0 && inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic > 1 && chord4 > 0 && ! inversion ),
                combinedChords.filter( ( { tonic, chord3, chord4, inversion } ) => tonic > 1 && chord4 > 0 && inversion )
            ].map( chords => ( {
                Score: chords.length > 0 ? ( chords.filter( ( { success } ) => success ).length / chords.length * 100 ).toFixed( 2 ) : "no data"
            } ) )
        } );
    } )(); }, [ configuration.session, page ] );

    return <ReactTooltip ref={ tooltip } trigger="click" interactive={ true } html={ <div
        className="grid"
        style={ { gridTemplateColumns: "repeat( 6, 1fr )" } }
    >
        <div
            style={ { gridArea: "1 / 1 / span 1 / span 6" } }
        >
            <BarChart width={ width - .05 * Math.min( width, height ) } height={ height - .5 * Math.min( width, height ) } data={ statistics.data }>
                <XAxis hide={ true }/>
                <YAxis unit="%" width={ Math.min( window.innerWidth, window.innerHeight ) * .15 }/>
                <ReferenceLine
                    y={ statistics.average }
                    label="average"
                />
                <Tooltip labelFormatter={ label => labels[ label ] }/>
                <Bar dataKey="Score">{
                    statistics.data.map( ( _, index ) => (
                    <Cell fill={ colors[ index ] }/> ) )
                }</Bar>
            </BarChart>
        </div>
        <Button
            gridArea="2 / 1 / span 1 / span 1"
            onClick={ () => setPage( page - 1 ) }
        >
            <Icon type="left"/>
        </Button>
        <Button
            gridArea="2 / 2 / span 1 / span 1"
            onClick={ () => setPage( page + 1 ) }
        >
            <Icon type="right"/>
        </Button>
        <Button
            gridArea="2 / 3 / span 1 / span 2"
            onClick={ Storage.clear }
        >
            RESET
        </Button>
        <Button
            gridArea="2 / 5 / span 1 / span 2"
            onClick={ () => tooltip.current.hideTooltip() }
        >
            CLOSE
        </Button>
    </div> }>{
        children
    }</ReactTooltip>;
}