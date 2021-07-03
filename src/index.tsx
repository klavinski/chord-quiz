/** This file is the entry point. It provides a universally-accessible configuration object. */

import "./style.css";
import * as React from "react";
import { render } from "react-dom";
import { ConfigurationProvider } from "./configuration";
import { App } from "./app";

render(
    <ConfigurationProvider>
        <App/>
    </ConfigurationProvider>,
    document.getElementById( "app" )
);