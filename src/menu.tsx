import * as React from "react";
import { Button } from "./button";
import { Icon } from "./icon";
import { InversionMenu } from "./inversion";
import { TimeMenu } from "./time";
import { TonicMenu } from "./tonic";
import { TriadMenu } from "./triad";
import { Major4Menu } from "./major4";
import { Minor4Menu } from "./minor4";
import { Dim4Menu } from "./dim4";
import { HelpMenu } from "./help";
import { TutorialMenu } from "./tutorial";

export const Menu = () => {

    return <div style={ {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: "2vmin 0"
    } }>
        <TimeMenu>
            <Button><Icon type="metronome"/></Button>
        </TimeMenu>
        <TonicMenu>
            <Button><Icon type="tonic"/></Button>
        </TonicMenu>
        <TriadMenu>
            <Button><Icon type="3"/></Button>
        </TriadMenu>
        <Major4Menu>
            <Button><Icon type="maj"/></Button>
        </Major4Menu>
        <Minor4Menu>
            <Button><Icon type="min"/></Button>
        </Minor4Menu>
        <Dim4Menu>
            <Button><Icon type="dim"/></Button>
        </Dim4Menu>
        <InversionMenu>
            <Button><Icon type="xy"/></Button>
        </InversionMenu>
            <Button><Icon type="eye"/></Button>
        <HelpMenu>
            <Button><Icon type="question"/></Button>
        </HelpMenu>
        <TutorialMenu>
            <Button><Icon type="book"/></Button>
        </TutorialMenu>
    </div>;
}