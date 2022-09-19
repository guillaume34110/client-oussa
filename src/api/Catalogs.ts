import Catalog, {CatalogDataType, CatalogType, PageType} from "../component/catalog/Catalog";
import {localisation} from "./localisation";
import {Store} from "../component/inventory/Inventory";


/*data Catalog*/
export const getCatalogByTextSearch = async (search: String): Promise<CatalogDataType[]> => {
    try {
        let response = await fetch(localisation + `/dataCatalog/search?research=${search}`, {
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

/*catalog*/
export const getCatalogByIds = async (catalogs: String[]): Promise<CatalogType[]> => {
    console.log("getCatalogByIds => ", catalogs)
    const sortedCatalogs = Array.from(new Set(catalogs))
    let query = ""
    sortedCatalogs.forEach((catalog, index) => {
        if (index > 0) query += "&catalog=" + catalog
    })
    console.log("getCatalogByIds => ", sortedCatalogs)
    if (sortedCatalogs[0] === undefined) return []
    try {
        let response = await fetch(localisation + `/catalog/id/?catalog=${sortedCatalogs[0]}${query}`, {
            method: "Get", // or 'PUT'
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();

    } catch {
        console.error("Error:", false);
        return [{
            _id: "",
            name: "",
            startDate: "",
            endDate: ""
        }]
    }

}
/*Pages*/
export const getPagesByIds = async (pages: String[]): Promise<PageType[]> => {
    console.log("getCatalogByIds => ", pages)
    const sortedPages = Array.from(new Set(pages))
    let query = ""
    sortedPages.forEach((page, index) => {
        if (index > 0) query += "&page=" + page
    })
    console.log("getCatalogByIds => ", sortedPages)
    if (sortedPages[0] === undefined) return []
    try {
        let response = await fetch(localisation + `/page/id/?page=${sortedPages[0]}${query}`, {
            method: "Get", // or 'PUT'
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();

    } catch {
        console.error("Error:", false);
        return [{
            _id : "",
            number: 0,
            catalog: "",
            store: "",
        }]
    }
}