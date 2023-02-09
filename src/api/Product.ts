import {Item, Product} from "../component/oussa/Oussa";
import {localisation} from "./localisation";

export const getProductByName = async (item: String): Promise<Product[]> => {

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