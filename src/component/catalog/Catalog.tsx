import {State} from "../../App";
import React, {useEffect, useState} from "react";
import {Store} from "../inventory/Inventory";
import {getStoresByIds} from "../../api/Store";
import {getCatalogByIds, getCatalogByTextSearch, getPagesByIds} from "../../api/Catalogs";
import './Catalog.css'


export interface CatalogDataType {
    page: string
    catalog: string
    store: string
    url: string
    text: string
}

export interface CatalogType {
    _id: string
    name: string
    startDate: string
    endDate: string
}

export interface PageType {
    _id: string
    number: Number
    catalog: string
    store: string
}

export interface CatalogWithStoreAndPage {
    page: PageType
    catalog: CatalogType
    store: Store
    url: string
    text: string
}


function Catalog({stateData, setStateData}:
                     { stateData: State, setStateData: React.Dispatch<React.SetStateAction<State>> }) {

    const [catalogs, setCatalogs] = useState<CatalogWithStoreAndPage[]>([])

    const getCatalog = async () => {
        const catalogsDataFromDb: CatalogDataType[] = await getCatalogByTextSearch(stateData.research.toLowerCase())
        const storesIds = catalogsDataFromDb.map(catalog => {
            return catalog.store
        })
        const stores: Store[] = await getStoresByIds(storesIds)
        const catalogsIds = catalogsDataFromDb.map(catalogs => {
            return catalogs.catalog
        })
        const catalogs: CatalogType[] = await getCatalogByIds(catalogsIds)
        const pagesIds = catalogsDataFromDb.map(catalogs => {
            return catalogs.page
        })
        const pages = await getPagesByIds(pagesIds)
        const catalogsWithStoreAndPage: CatalogWithStoreAndPage[] = catalogsDataFromDb.map(dataCatalog => {
            const currentStore = stores.find(store =>
                store._id === dataCatalog.store
            )
            const currentCatalog = catalogs.find(catalog =>
                catalog._id === dataCatalog.catalog
            )
            const currentPage = pages.find(page =>
                page._id === dataCatalog.page
            )
            if (currentStore === undefined
                || currentCatalog === undefined
                || currentPage === undefined
            ) return {
                page: {
                    _id: "",
                    number: 0,
                    catalog: "",
                    store: ""
                },
                catalog: {
                    _id: "",
                    name: "",
                    startDate: "",
                    endDate: "",
                },
                store: {
                    _id: "",
                    name: "",
                    location: "",
                    longitude: "",
                    latitude: "",
                    img:"",
                },
                url: dataCatalog.url,
                text: dataCatalog.text,
            }

            return {
                page: currentPage,
                catalog: currentCatalog,
                store: currentStore,
                url: dataCatalog.url,
                text: dataCatalog.text,
            }
        })
        console.log(catalogsWithStoreAndPage)
        setCatalogs(catalogsWithStoreAndPage)

    }

    useEffect(() => {
        let newData = JSON.parse(JSON.stringify(stateData))
        newData.research = ""
        setStateData(newData)
    }, [])
    useEffect(() => {
        if (stateData.research != "") {
            getCatalog()
        }
    }, [stateData.research])
    return (
        <div className="catalog">
            <ul>
                {catalogs && catalogs.map((catalog, index) => {
                        return <li key={index} className={"catalog-card"}>
                            <div className={"catalog-card-text"}>catalogue : {catalog.catalog.name} | page
                                : {catalog.page.number.toString()} | magasin
                                : {catalog.store.name} | ville : {catalog.store.location}
                            </div>
                            <img className="catalog-card-img" alt="uploaded img" src={catalog.url}/>
                        </li>
                    }
                )}
            </ul>
        </div>
    )
}

export default Catalog;