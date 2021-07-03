/** This file contains the React components to display chord symbols.*/

import * as React from "react";
import { Tonic } from "./configuration";

export const encode = ( notation: Tonic ) => notation.replace( "#", "♯" ).replace( "b", "♭" );

/** Some chords have both upper and lower annotations. To achieve a proper display, we set the width of the first one to 0. */
const noWidth = { display: "inline-block", width: 0 };

export const major3 = {
    M: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span></span>
    },
    Mb5: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>♭5</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>5−</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>5♭</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    aug: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub>+</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>5+</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>#5</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>aug</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    sus: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub>sus</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub>4</sub>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sub>sus<sup>4</sup></sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    }
};

export const minor3 = {
    m: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub>m</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub>min</sub>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sub>−</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    dim: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>(♭5)</sup><sub>min</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }°{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sub style={ noWidth }>m</sub><sup>5♭</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    "m+": {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub>m+</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>m</sub><sup>5+</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    }
};

export const major4_1 = {
    dom: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>7</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span></span>
    },
    M7: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>Δ</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>Maj7</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>7M</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>M7</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>MA7</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    "7sus": {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>7</sup><sub>sus</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>7</sup><sub>4</sub>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup style={ noWidth }>7</sup><sub>sus<sup>4</sup></sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    "7b5": {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>7(♭5)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>7(−5)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    }
};

export const major4_2 = {
    "7aug": {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>7</sup><sub>+</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>7+</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>7+5</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>7aug</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>7(♯5)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    "maj7+5": {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>+</sub><sup>Δ</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>+</sub><sup>7M</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    add6: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>6</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>(add 6)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    add9: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>add 9</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup>(add 9)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    }
};

export const minor4_1 = {
    m7: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>7</sup><sub>m</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>7</sup><sub>min</sub>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup style={ noWidth }>7</sup><sub>mi</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    mM7: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>Δ</sup><sub>m</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>m</sub><sup>Maj7</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sub style={ noWidth }>m</sub><sup>7M</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    m7b5: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>m</sub><sup>7(♭5)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>min</sub><sup>7(♭5)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }ø{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    }
};

export const minor4_2 = {
    oM7: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }°<sup>(Δ)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }°<sup>(7M)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    m6:{
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sup style={ noWidth }>6</sup><sub>m</sub>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>m</sub><sup>add 6</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    },
    madd9:{
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>m</sub><sup>add 9</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }<sub style={ noWidth }>m</sub><sup>(add 9)</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>
    }
};

export const dim4 = {
    dim7: {
        Symbol: ( { root, tonic } ) => <span>{ encode( tonic ) }°{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
        OtherSymbols: ( { root, tonic } ) => <span>{ encode( tonic ) }dim<sup>7</sup>{ root !== tonic && <span>/{ encode( root ) }</span> } − { encode( tonic ) }<sup>7−</sup>{ root !== tonic && <span>/{ encode( root ) }</span> }</span>,
    }
};
export const chords = { ...major3, ...minor3, ...major4_1, ...major4_2, ...minor4_1, ...minor4_2, ...dim4 };