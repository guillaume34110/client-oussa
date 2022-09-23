import LogoOussa from "../../assets/logo-start.png";
import React, {useEffect, useRef} from "react";
import {FirstSearch, State} from "../../App";

function Logo({stateData}: { stateData: State }) {

    const logoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        if (stateData.firstSearch === FirstSearch.WithMap && logoRef.current !== null) logoRef.current.classList.remove('visible')
    }, [stateData.firstSearch])

    return (
        <div className="logo-oussa visible" ref={logoRef}>
            <img className={""} src={LogoOussa} alt="Logo"/>
        </div>
    )
}

export default Logo;