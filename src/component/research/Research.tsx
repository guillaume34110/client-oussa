import React, {useEffect, useRef, useState} from "react";
import {FirstSearch, State} from "../../App";
import './Research.css'
import Pin from "../../assets/pin-blue-min.png";
import {getItemByName} from "../../api/Items";
import {getStoresByIds} from "../../api/Store";
import {Item, ItemWithStore, Store} from "../oussa/Oussa";

function Research({
                      stateData,
                      setStateData,
                      setItemToDisplay
                  }: { stateData: State, setStateData: React.Dispatch<React.SetStateAction<State>>, setItemToDisplay: React.Dispatch<React.SetStateAction<ItemWithStore[]>> }) {

    const researchRef = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLDivElement>(null)
    const tagsRef = useRef<HTMLUListElement>(null)
    const researchContainerRef = useRef<HTMLDivElement>(null)
    const [itemsTags, setItemsTag] = useState<string[]>()
    const [items, setItems] = useState<Item[]>([])

    const search = () => {
        if (researchRef.current != null) {
            let newData = JSON.parse(JSON.stringify(stateData))
            newData.research = researchRef.current.value
            if (stateData.firstSearch === FirstSearch.WithoutMap) newData.firstSearch = FirstSearch.WithMap
            setStateData(newData)
        }
    }

    const suggest = async () => {
        if (researchRef.current != null && researchRef.current.value.length > 1) {
            let newData = JSON.parse(JSON.stringify(stateData))
            newData.suggest = researchRef.current.value
            setStateData(newData)
        } else {
            if (researchRef.current === null || btnRef.current === null || tagsRef.current === null) return
            researchRef.current.classList.remove('dropdown-bar')
            btnRef.current.classList.remove('dropdown-btn')
            tagsRef.current.classList.add('inventory-tags-dropdown')
            setItemsTag([])
        }
    }

    const getItem = async () => {
        if (researchRef.current === null || btnRef.current === null || tagsRef.current === null) return
        researchRef.current.classList.remove('dropdown-bar')
        btnRef.current.classList.remove('dropdown-btn')
        tagsRef.current.classList.add('inventory-tags-dropdown')
        setItemsTag([])
        const storesIds = items.map(item => {
            return item.store
        })

        const stores: Store[] = await getStoresByIds(storesIds)

        const itemsWithStores: ItemWithStore[] = items.map((item, index) => {
                const store = stores.find(store =>
                    store._id === item.store
                ) || {
                    _id: "",
                    name: "",
                    location: "",
                    longitude: "",
                    latitude: "",
                    img: "",
                }
                return {
                    name: item.name,
                    price: item.price,
                    store: store,
                }
            }
        )
        setItemToDisplay(itemsWithStores)
    }

    const getTags = async () => {
        if (researchRef.current === null || btnRef.current === null || tagsRef.current === null) return
        researchRef.current.classList.add('dropdown-bar')
        btnRef.current.classList.add('dropdown-btn')
        tagsRef.current.classList.remove('inventory-tags-dropdown')
        const items: Item[] = await getItemByName(stateData.suggest)
        setItems(items)
        const tags: string[] = Array.from(new Set(items.map(item => {
            return item.name
        })))
        setItemsTag(tags)
    }

    const selectItem = (e: React.MouseEvent<HTMLLIElement>) => {
        if (e.currentTarget.textContent === null || researchRef.current === null || btnRef.current === null || tagsRef.current === null) return
        const newItemsToDisplay = items.filter(item => item.name === e.currentTarget.textContent)
        setItems(newItemsToDisplay)
        setItemsTag([])
        researchRef.current.classList.remove('dropdown-bar')
        btnRef.current.classList.remove('dropdown-btn')
        tagsRef.current.classList.add('inventory-tags-dropdown')
        researchRef.current.value = e.currentTarget.textContent
        e.currentTarget.style.filter = "brightness(110%)"
    }

    useEffect(() => {
        if (stateData.research != "") {
            getItem()
        }
    }, [stateData.research])

    useEffect(() => {
        if (stateData.suggest != "") {
            getTags()
        }
    }, [stateData.suggest])

    useEffect(() => {
        if (stateData.firstSearch === FirstSearch.WithMap && researchContainerRef.current !== null && tagsRef.current !== null) {
            researchContainerRef.current.classList.remove('research-without-map')
            tagsRef.current.classList.remove("inventory-tags-without-map")
        }
    }, [stateData.firstSearch])

    return (
        <div className="research research-without-map" ref ={researchContainerRef}>
            <input className="research-input" type="text" name="search" placeholder={"recherche"} ref={researchRef}
                   onChange={suggest} autoComplete="off"/>
            <div className={"btn-research research-btn "}
                 ref={btnRef}
                 onClick={search}><img className={"research-pin"} src={Pin} alt="Logo"/></div>
            <ul className={"inventory-tags inventory-tags-dropdown inventory-tags-without-map"} ref={tagsRef}>
                {itemsTags && itemsTags.map((item, index) => {
                        return <li key={index} className={"inventory-tag tag-" + item} onClick={selectItem}>{item}</li>
                    }
                )}
            </ul>
        </div>
    )
}

export default Research;
