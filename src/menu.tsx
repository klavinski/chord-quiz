import * as React from "react";
import { Icon } from "./icon";

export const Menu = () => {

    return <div style={ {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: "5vmin 0"
    } }>
        <Icon type="metronome"/>
        <Icon type="chord"/>
        <Icon type="3"/>
        <Icon type="maj"/>
        <Icon type="min"/>
        <Icon type="dim"/>
        <Icon type="xy"/>
        <Icon type="eye"/>
        <Icon type="question"/>
        <Icon type="book"/>
    </div>;
}