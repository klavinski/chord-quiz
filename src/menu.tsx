import * as React from "react";
import { Icon } from "./icon";
import { TimeMenu } from "./time";
import { TonicMenu } from "./tonic";
import { TriadMenu } from "./triad";

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
        <Icon type="maj"/>
        <Icon type="min"/>
        <Icon type="dim"/>
        <Icon type="xy"/>
        <Icon type="eye"/>
        <Icon type="question"/>
        <Icon type="book"/>
    </div>;
}