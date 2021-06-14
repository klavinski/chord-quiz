import * as React from "react";
import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { configurationContext } from "./configuration";
import { Button } from "./button";

export const TimeMenu = ( { children } ) => {

    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip trigger="click" html={ <> {
        [ 8, 7, 6, 5, 4, 3, 2, 1, "Man" ].map( time =>
            <Button
                selected={ configuration.time === time }
                onClick={ () => setConfiguration( { ...configuration, time } ) }
                key={ time }
            >
                { time }
            </Button>
        )
    } </> }>
        { children }
    </Tooltip>;
}