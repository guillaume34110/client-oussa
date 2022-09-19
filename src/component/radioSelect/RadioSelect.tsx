import React, {useRef} from "react";
import {State} from "../../App";
import './RadioSelect.css'

function RadioSelect({stateData, setStateData}:
                         { stateData: State, setStateData: React.Dispatch<React.SetStateAction<State>> }) {

    const select = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newData = JSON.parse(JSON.stringify(stateData))
        newData.radio = e.target.value
        setStateData(newData)

    }

    return (
        <div className="radio-select">

            <div className={"radio-select-container"}>
                <input type="radio" id="articles" name="radio" value="inventory" onChange={select}/>
                <label htmlFor="articles">Articles</label>
            </div>
            <div className={"radio-select-container"}>
                <input type="radio" id="catalogue" name="radio" value="catalog" onChange={select} defaultChecked/>
                <label htmlFor="catalogue">Catalogue</label>
            </div>

        </div>
    )
}

export default RadioSelect;