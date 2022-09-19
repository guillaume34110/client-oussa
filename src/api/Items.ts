import {localisation} from "./localisation";
import {Item} from "../component/inventory/Inventory";

export const getItemByName = async (item: String): Promise<Item[]> => {
    try {
        let response = await fetch(localisation + `/inventory?item=${item}`, {
            method: "Get", // or 'PUT'
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();

    } catch {
        console.error("Error:", false);
        return []
    }
}