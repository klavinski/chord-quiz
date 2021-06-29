import * as React from "react";
import { useContext, useRef } from "react";
import { Tooltip } from "react-tippy";
import { configurationContext } from "./configuration";
import { Button } from "./button";
import { Icon } from "./icon";

const help = {
    en: <div>Help: to be completed</div>,
    fr: <div>Aide : à compléter</div>
};

export const HelpMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <>
        <div className="grid">
            { [ "fr", "en" ].map( language =>
            <Button
                onClick={ () => setConfiguration( configuration => ( { ...configuration, language } ) ) }
                selected={ configuration.language === language }
            >
                <Icon type={ language }/>
            </Button> ) }
            { help[ configuration.language ] }
        </div>
    </>
    }>{
        children
    }</Tooltip>;
}