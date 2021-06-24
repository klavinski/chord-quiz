import * as React from "react";

export const encode = notation => notation.replace( "#", "♯" ).replace( "b", "♭" );

export const major3 = {
    M: {
        Symbol: ( { root, tonic } ) => <>{ encode( tonic ) }{ root !== tonic && <>/{ encode( root ) }</> }</>,
        OtherSymbols: ( { root, tonic } ) => <></>
    },
    Mb5: {
        Symbol: ( { root, tonic } ) => <>{ encode( tonic ) }<sup>♭5</sup>{ root !== tonic && <>/{ encode( root ) }</> }</>,
        OtherSymbols: ( { root, tonic } ) => <>{ encode( tonic ) }<sup>5−</sup>{ root !== tonic && <>/{ encode( root ) }</> } − { encode( tonic ) }<sup>5♭</sup>{ root !== tonic && <>/{ encode( root ) }</> }</>
    },
    sus: {
        Symbol: ( { root, tonic } ) => <>{ encode( tonic ) }<sup>sus</sup>{ root !== tonic && <>/{ encode( root ) }</> }</>,
        OtherSymbols: ( { root, tonic } ) => <>{ encode( tonic ) }<sub>4</sub>{ root !== tonic && <>/{ encode( root ) }</> } − { encode( tonic ) }sus<sup>4</sup>{ root !== tonic && <>/{ encode( root ) }</> }</>
    }
};

export const minor3 = {
    m: {
        Symbol: ( { root, tonic } ) => <>{ encode( tonic ) }m{ root !== tonic && <>/{ encode( root ) }</> }</>,
        OtherSymbols: ( { root, tonic } ) => <>{ encode( tonic ) }min{ root !== tonic && <>/{ encode( root ) }</> } − { encode( tonic ) }−{ root !== tonic && <>/{ encode( root ) }</> }</>
    },
};

export const major4_1 = {
    M7: {
        Symbol: ( { root, tonic } ) => <>{ encode( tonic ) }<sup>7</sup>{ root !== tonic && <>/{ encode( root ) }</> }</>,
        OtherSymbols: ( { root, tonic } ) => <></>
    }
};

export const major4_2 = {};
export const minor4_1 = {};
export const minor4_2 = {};
export const dim4 = {
    dim7: {
        Symbol: ( { root, tonic } ) => <>{ encode( tonic ) }°{ root !== tonic && <>/{ encode( root ) }</> }</>,
        OtherSymbols: ( { root, tonic } ) => <>{ encode( tonic ) }dim<sup>7</sup>{ root !== tonic && <>/{ encode( root ) }</> } − { encode( tonic ) }<sup>7−</sup>{ root !== tonic && <>/{ encode( root ) }</> }</>,
    }
};
export const chords = { ...major3, ...minor3, ...major4_1, ...major4_2, ...minor4_1, ...minor4_2, ...dim4 };