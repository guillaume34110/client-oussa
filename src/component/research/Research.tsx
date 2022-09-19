import React, {useEffect, useRef, useState} from "react";
import {State} from "../../App";
import './Research.css'
import Pin from "../../assets/pin-red-min.png";
import {getItemByName} from "../../api/Items";
import {getStoresByIds} from "../../api/Store";
import {sleep} from "../../tools/sleep";
import {Item, ItemWithStore, Store} from "../inventory/Inventory";

function Research({
                      stateData,
                      setStateData,
                      setItemToDisplay
                  }: { stateData: State, setStateData: React.Dispatch<React.SetStateAction<State>>, setItemToDisplay: React.Dispatch<React.SetStateAction<ItemWithStore[]>> }) {

    const researchRef = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLDivElement>(null)
    const tagsRef = useRef<HTMLUListElement>(null)
    const [itemsTags, setItemsTag] = useState<string[]>()
    const [inventory, setInventory] = useState<ItemWithStore[]>([])

    const search = () => {
        if (researchRef.current != null) {
            let newData = JSON.parse(JSON.stringify(stateData))
            newData.research = researchRef.current.value
            setStateData(newData)
        }
    }
    const suggest = async () => {
        if (researchRef.current != null) {
            let newData = JSON.parse(JSON.stringify(stateData))
            newData.suggest = researchRef.current.value
            setStateData(newData)
        }
    }
    const getItem = async () => {
        const items: Item[] = await getItemByName(stateData.research)
        console.log(items, "items")
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
                    img:"",
                }
                return {
                    name: item.name,
                    price: item.price,
                    store: store,
                }
            }
        )
        console.log(itemsWithStores)
        setInventory(itemsWithStores)
        const newItemsToDisplay = itemsWithStores.filter(item => item.name === itemsWithStores[0].name)
        setItemToDisplay(newItemsToDisplay)
        await sleep(200)
        const tag: HTMLLIElement | null = document.querySelector(`.tag-${itemsWithStores[0].name}`)
        if (tag !== null) tag.style.filter = "brightness(110%)"
    }

    const getTags = async () => {
        if (researchRef.current === null || btnRef.current === null || tagsRef.current === null) return
        researchRef.current.classList.add('dropdown-bar')
        btnRef.current.classList.add('dropdown-btn')
        tagsRef.current.classList.remove('inventory-tags-dropdown')
        const items: Item[] = await getItemByName(stateData.suggest)
        const tags: string[] = Array.from(new Set(items.map(item => {
            return item.name
        })))
        setItemsTag(tags)
    }
    const selectItem = (e: React.MouseEvent<HTMLLIElement>) => {
        if (e.currentTarget.textContent === null || researchRef.current === null || btnRef.current === null || tagsRef.current === null) return
        const newItemsToDisplay = inventory.filter(item => item.name === e.currentTarget.textContent)
        setItemsTag([])
        researchRef.current.classList.remove('dropdown-bar')
        btnRef.current.classList.remove('dropdown-btn')
        tagsRef.current.classList.add('inventory-tags-dropdown')
        researchRef.current.value = e.currentTarget.textContent
        setItemToDisplay(newItemsToDisplay)
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
    return (
        <div className="research">
            <input className="research-input" type="text" name="search" placeholder={"recherche"} ref={researchRef}
                   onChange={suggest}/>
            <div className={"btn-research research-btn "}
                 ref={btnRef}
                 onClick={search}><img className={"research-pin"} src={Pin} alt="Logo"/></div>
            <ul className={"inventory-tags inventory-tags-dropdown"} ref={tagsRef}>
                {itemsTags && itemsTags.map((item, index) => {
                        return <li key={index} className={"inventory-tag tag-" + item} onClick={selectItem}>{item}</li>
                    }
                )}
            </ul>
        </div>
    )
}

export default Research;
