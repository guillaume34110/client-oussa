import Map, {
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
    ViewStateChangeEvent
} from "react-map-gl";
import {ItemWithStore, PopupInfo} from "./Inventory";
import 'mapbox-gl/dist/mapbox-gl.css'
import Pin from "../../assets/pin-red-min.png"
import React, {useEffect, useState} from "react";
import './map.css'

function ReunionMap({
                        inventory,
                    }:
                        {
                            inventory: ItemWithStore[],

                        }) {

    const initialZoom = 9.2
    const [zoom, setZoom] = useState<number>(initialZoom)
    const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);


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
        console.log(newPopupInfo, 'popupu')
        setPopupInfo(newPopupInfo)
    }

    useEffect(() => {
        console.log(popupInfo, 'effect')
    }, [popupInfo])

    return (
        <>
            <Map onZoom={resize}
                 initialViewState={{
                     longitude: 55.5074887,
                     latitude: -21.1535665,
                     zoom: initialZoom
                 }}
                 style={{width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', zIndex: '0'}}
                 mapStyle="mapbox://styles/mapbox/streets-v9"
                 mapboxAccessToken="pk.eyJ1IjoiYmdoamZ1eWd5Z3lrZ2ZpdWsiLCJhIjoiY2w4MXdpa21lMDAwZTN1bXh4Z2Jvb2gzcCJ9.0Nf8W1ZB5LwrsNYZp9T2Qw"
            >
                <GeolocateControl position="top-left"/>
                <NavigationControl position="top-left"/>
                <ScaleControl/>
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
        </>
    )
}

export default ReunionMap;