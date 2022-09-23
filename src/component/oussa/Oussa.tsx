import {State} from "../../App";
import React, {useEffect, useState} from "react";
import "./Oussa.css"
import {OussaMap} from "../map/OussaMap";
import Research from "../research/Research";
import Logo from "../logo/Logo";

export interface Item {
    name: string,
    price: string,
    store: string,
}

export interface Store {
    _id: string,
    name: string,
    location: string,
    longitude: string,
    latitude: string,
    img: string,
}

export interface ItemWithStore {
    name: string,
    price: string,
    store: Store,
}

export interface PopupInfo {
    name: string,
    longitude: number,
    latitude: number,
    location: string,
    img: string,
}

function Oussa({stateData, setStateData}:
                   { stateData: State, setStateData: React.Dispatch<React.SetStateAction<State>> }) {

    const [itemToDisplay, setItemToDisplay] = useState<ItemWithStore[]>([])

    useEffect(() => {
        let newData = JSON.parse(JSON.stringify(stateData))
        newData.research = ""
        setStateData(newData)
    }, [])

    return (
        <div className="inventory">
            <Logo stateData={stateData}/>
            <Research stateData={stateData} setStateData={setStateData} setItemToDisplay={setItemToDisplay}/>
            <OussaMap inventory={itemToDisplay} stateData={stateData}/>
        </div>
    )
}

export default Oussa;