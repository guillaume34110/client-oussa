import React, {useRef, useState} from 'react';
import './App.css';
import Research from "./component/research/Research";
import Inventory from "./component/inventory/Inventory";
import RadioSelect from "./component/radioSelect/RadioSelect";
import Catalog from "./component/catalog/Catalog";

export interface State {
    research: string
    radio : string
    suggest: string
}

function App() {

    const [stateData, setStateData] = useState<State>({research: "" , radio : "catalog", suggest:""})


    return (
        <div className="App">
            <div className={"radio-research"}>
                {/*<RadioSelect stateData={stateData} setStateData={setStateData}/>*/}

            </div>
            {/*{stateData.radio === "catalog" &&*/}
            {/*<Catalog stateData={stateData} setStateData={setStateData}/>*/}
            {/*}*/}
            {/*{stateData.radio === "inventory" &&*/}
                <Inventory stateData={stateData} setStateData={setStateData}/>
            {/*}*/}

        </div>
    );
}

export default App;

