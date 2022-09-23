import {localisation} from "./localisation";
import {Store} from "../component/oussa/Oussa";

export const getStoresByIds = async (stores: String[]): Promise<Store[]> => {
    console.log("getStoreById => ", stores)
    const sortedStores = Array.from(new Set(stores))
    let query = ""
    sortedStores.forEach((store, index) => {
        if (index > 0) query += "&store=" + store
    })
    console.log("getStoreById => ", sortedStores)
    if (sortedStores[0] === undefined) return [{_id: "", name: "", location: "", latitude: "", longitude: "", img: ""}]
    try {
        let response = await fetch(localisation + `/store/id/?store=${sortedStores[0]}${query}`, {
            method: "Get", // or 'PUT'
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();

    } catch {
        console.error("Error:", false);
        return [{_id: "", name: "", location: "", latitude: "", longitude: "", img: ""}]
    }
}
