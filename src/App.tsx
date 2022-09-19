import React, {useState} from 'react';
import './App.css';
import Inventory from "./component/inventory/Inventory";
import {BrowserRouter} from "react-router-dom";

export interface State {
    research: string
    radio: string
    suggest: string
}

function App() {

    const [stateData, setStateData] = useState<State>({research: "", radio: "catalog", suggest: ""})


    return (
        <div className="App">
            {/*<div className={"radio-research"}>*/}
            {/*    /!*<RadioSelect stateData={stateData} setStateData={setStateData}/>*!/*/}
            {/*</div>*/}
            {/*{stateData.radio === "catalog" &&*/}
            {/*<Catalog stateData={stateData} setStateData={setStateData}/>*/}
            {/*}*/}
            {/*{stateData.radio === "inventory" &&*/}
            <React.StrictMode>
                <BrowserRouter>
                    <Inventory stateData={stateData} setStateData={setStateData}/>
                </BrowserRouter>
            </React.StrictMode>
            {/*}*/}

        </div>
    );
}

export default App;

