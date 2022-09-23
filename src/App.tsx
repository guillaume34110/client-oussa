import React, {useState} from 'react';
import './App.css';
import Oussa from "./component/oussa/Oussa";
import {BrowserRouter} from "react-router-dom";

export interface State {
    research: string
    radio: string
    suggest: string
    firstSearch : FirstSearch
}

export const enum FirstSearch{
    WithoutMap,WithMap
}

function App() {

    const [stateData, setStateData] = useState<State>({research: "", radio: "catalog", suggest: "" , firstSearch : FirstSearch.WithoutMap})

    return (
        <div className="App">
            <React.StrictMode>
                <BrowserRouter>
                    <Oussa stateData={stateData} setStateData={setStateData}/>
                </BrowserRouter>
            </React.StrictMode>
        </div>
    );
}

export default App;

