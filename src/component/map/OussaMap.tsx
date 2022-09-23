
import {ItemWithStore, PopupInfo} from "../oussa/Oussa";
import 'mapbox-gl/dist/mapbox-gl.css'
import Pin from "../../assets/pin-red-min.png"
import React, {useEffect, useRef, useState} from "react";
import './Map.css'
import {FirstSearch, State} from "../../App";
import Map, {GeolocateControl, MapboxMap, Marker, NavigationControl, Popup, ViewStateChangeEvent} from "react-map-gl";

export function OussaMap({
                        inventory,
                        stateData
                    }:
                        {
                            inventory: ItemWithStore[],
                            stateData: State
                        }) {

    const initialZoom = 8.8 - (window.innerWidth / 1280)
    const [zoom, setZoom] = useState<number>(initialZoom)
    const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
    const mapRef = useRef<HTMLDivElement>(null)

    const resize = (e: ViewStateChangeEvent) => {
        setZoom(e.viewState.zoom)
    }

    const openPopup = (e: React.MouseEvent<HTMLImageElement>) => {
        if (e.currentTarget.dataset.name === undefined
            || e.currentTarget.dataset.latitude === undefined
            || e.currentTarget.dataset.longitude === undefined
            || e.currentTarget.dataset.img === undefined
            || e.currentTarget.dataset.location === undefined
        ) return

        const newPopupInfo: PopupInfo = {
            name: e.currentTarget.dataset.name,
            latitude: parseFloat(e.currentTarget.dataset.latitude),
            longitude: parseFloat(e.currentTarget.dataset.longitude),
            img: e.currentTarget.dataset.img,
            location: e.currentTarget.dataset.location,
        }
        setPopupInfo(newPopupInfo)
    }

    useEffect(() => {
        if (stateData.firstSearch === FirstSearch.WithMap && mapRef.current !== null) mapRef.current.classList.remove('invisible')
    }, [stateData.firstSearch])

    return (
        <div ref={mapRef} className={"map-container invisible"}>
            <Map
                 initialViewState={{
                     longitude: 55.5274887,
                     latitude: -21.1535665,
                     zoom: initialZoom
                 }}
                 minZoom={8.2}
                 maxBounds={[[54, -22], [57, -19.5]]}
                 style={{width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', zIndex: '0'}}
                 mapStyle="mapbox://styles/mapbox/streets-v9"
                 mapboxAccessToken="pk.eyJ1IjoiYmdoamZ1eWd5Z3lrZ2ZpdWsiLCJhIjoiY2w4MXdpa21lMDAwZTN1bXh4Z2Jvb2gzcCJ9.0Nf8W1ZB5LwrsNYZp9T2Qw"
                 onZoom={resize}
                 >
                <GeolocateControl position="bottom-left"/>
                <NavigationControl position="bottom-left"/>
                {inventory && inventory.map((item, index) => (
                    <Marker key={"marker-" + index} longitude={parseFloat(item.store.longitude)}
                            latitude={parseFloat(item.store.latitude)} anchor="bottom">
                        <img className={"pin"} src={Pin} alt="Logo" data-name={item.store.name}
                             data-latitude={item.store.latitude} data-longitude={item.store.longitude}
                             data-img={item.store.img} data-location={item.store.location}
                             height={(47 * (zoom / initialZoom))} onClick={openPopup}/>

                    </Marker>)
                )}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        closeOnClick={false}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className={'popup'}>
                            <div> {popupInfo.name}</div>
                            <div>{popupInfo.location}</div>
                            <div className={"popup-img-contenair"}>
                                <img src={popupInfo.img} alt={"logo du magasin"} className={"popup-img"}/>
                            </div>
                        </div>
                    </Popup>
                )}

            </Map>
        </div>
    )
}
