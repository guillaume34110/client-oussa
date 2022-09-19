import {State} from "../../App";
import React, {useEffect, useRef, useState} from "react";
import "./Inventory.css"
import ReunionMap from "./reunionMap";
import Research from "../research/Research";

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
    img:string,
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
    location : string,
    img:string,
}

function Inventory({stateData, setStateData}:
                       { stateData: State, setStateData: React.Dispatch<React.SetStateAction<State>> }) {


    const [itemToDisplay, setItemToDisplay] = useState<ItemWithStore[]>([])






    useEffect(() => {
        let newData = JSON.parse(JSON.stringify(stateData))
        newData.research = ""
        setStateData(newData)
    }, [])




    return (
        <div className="inventory">
            <Research stateData={stateData} setStateData={setStateData} setItemToDisplay={setItemToDisplay}/>
            <ReunionMap inventory={itemToDisplay}/>
        </div>
    )
}

export default Inventory;