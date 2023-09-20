import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "index.scss";

const div = document.getElementById('root')
const root = createRoot(div!)
root.render(<App />)

serviceWorker.unregister();
