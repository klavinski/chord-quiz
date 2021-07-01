import * as React from "react";
import imgs from "./*.png";

const previousWhite = note => [ 0, 5 ].includes( note % 12 ) ? note - 1 : note - 2;
const marginsLeft = { 1: "-21px", 3: "-11px", 6: "-23px", 8: "-16px", 10: "-8px" };
const marginsRight = { 1: "-41px", 3: "-51px", 6: "-39px", 8: "-46px", 10: "-54px" };

const Key = ( { chord, note: key }: { chord: number[], note: number } ) => {

    if ( key % 12 in imgs )

        return <>
            { chord.includes( key ) && ! chord.includes( previousWhite( key ) ) &&
            <img
                src={ imgs[ [ 0, 5 ].includes( key % 12 ) ? "long" : "short" ] }
                style={ {
                    verticalAlign: "top",
                    marginRight: "-40px",
                    width: "40px",
                    position: "relative",
                    zIndex: 2
                } }
            /> }
            <img
                src={ imgs[ key % 12 ] }
                style={ {
                    verticalAlign: "top",
                    height: chord.includes( key ) ? "335px" : "330px",
                    width: "55px",
                    position: "relative",
                    zIndex: 1,
                    filter: chord.includes( key ) ? "sepia(100%) hue-rotate(165deg) brightness(80%) saturate(400%)" : "none"
                } }
            />
        </>;

    return <>
        <img
            src={ imgs.black }
            style={ {
                marginLeft: marginsLeft[ key % 12 ],
                zIndex: 0,
                width: "32px",
                height: chord.includes( key ) ? "235px" : "230px",
                verticalAlign: "top",
                position: "relative",
                filter: chord.includes( key ) ? "sepia(100%) hue-rotate(150deg) brightness(250%) contrast(180%)" : "none"
            } }
        />
        <img
            src={ imgs[ ( chord.includes( key ) ? "on" : "off" ) + " " + ( chord.includes( key + 1 ) ? "on" : "off" ) ] }
            style={ {
                marginLeft: "-2px",
                marginRight: marginsRight[ key % 12 ],
                zIndex: 2,
                width: "32px",
                verticalAlign: "top",
                position: "relative"
            } }
        />
        {  }
    </>;
}

export const Keyboard = ( { chord, width }: { chord: number[], width: number } ) => {

    return <div style={ { width, height: width * 335 / 825, overflow: "hidden" } }>
        <div style={ { width: 825, transformOrigin: "top left", transform: "scale( " + ( width / 825 ) + " )" } } >
            { [ ...new Array( 26 ) ].map( ( _, note ) => <Key key={ note } note={ note + 51 } chord={ chord }/> ) }
        </div>
    </div>;

}