import * as React from "react";
import { Icon } from "./icon";
import { InversionMenu } from "./inversion";
import { TimeMenu } from "./time";
import { TonicMenu } from "./tonic";
import { TriadMenu } from "./triad";
import { Major4Menu } from "./major4";
import { Minor4Menu } from "./minor4";
import { Dim4Menu } from "./dim4";

export const Menu = () => {

    return <div style={ {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: "5vmin 0"
    } }>
        <TimeMenu>
            <Icon type="metronome"/>
        </TimeMenu>
        <TonicMenu>
            <Icon type="tonic"/>
        </TonicMenu>
        <TriadMenu>
            <Icon type="3"/>
        </TriadMenu>
        <Major4Menu>
            <Icon type="maj"/>
        </Major4Menu>
        <Minor4Menu>
            <Icon type="min"/>
        </Minor4Menu>
        <Dim4Menu>
            <Icon type="dim"/>
        </Dim4Menu>
        <InversionMenu>
            <Icon type="xy"/>
        </InversionMenu>
        <Icon type="eye"/>
        <Icon type="question"/>
        <Icon type="book"/>
    </div>;
}