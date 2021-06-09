import "./style.css";

import * as React from "react";
import { render } from "react-dom";
import { Keyboard } from "./keyboard";
import { Stave } from './stave';
import { Menu } from "./menu";

render(
    <>
        <Menu/>
        <Stave/>
        <Keyboard chord={ new Set( [ 12, 15, 16, 21 ] ) }/>
    </>,
    document.getElementById( "app" )
);