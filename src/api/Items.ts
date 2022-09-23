import {localisation} from "./localisation";
import {Item} from "../component/oussa/Oussa";

export const getItemByName = async (item: String): Promise<Item[]> => {
    try {
        let response = await fetch(localisation + `/inventory?item=${item}`, {
            method: "Get", // or 'PUT'
            mode: 'cors',
            headers: {
                "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://oussa-loby.herokuapp.com"
            },
        });
        return await response.json();

    } catch {
        console.error("Error:", false);
        return []
    }
}