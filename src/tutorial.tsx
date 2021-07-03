import * as React from "react";
import { useContext, useRef } from "react";
import { Tooltip } from "react-tippy";
import { Button } from "./button";
import { Configuration, configurationContext } from "./configuration";
import { Icon } from "./icon";

const tutorial = {
    en: <div>Tutorial: to be completed</div>,
    fr: <div>Tutoriel : à compléter</div>
};

export const TutorialMenu = ( { children } ) => {

    const tooltip = useRef( null );
    const [ configuration, setConfiguration ] = useContext( configurationContext );
    return <Tooltip ref={ tooltip } trigger="click" interactive={ true } html={ <>
        <div className="grid">
            { [ "fr", "en" ].map( ( language: Configuration[ "language" ] ) =>
            <Button
                onClick={ () => setConfiguration( configuration => ( { ...configuration, language } ) ) }
                selected={ configuration.language === language }
            >
                <Icon type={ language }/>
            </Button> ) }
            { tutorial[ configuration.language ] }
        </div>
        
    </>
    }>{
        children
    }</Tooltip>;
}