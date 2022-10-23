import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import AbraProdej from "./AbraProdej/AbraProdej";

import { Provider } from "react-redux";
import { init } from "@rematch/core";
import * as models from "./AbraProdej/models/firmsListModel";

const store = init({ models });

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AbraProdej />
        </Provider>
    </React.StrictMode>
);
