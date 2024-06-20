import { NavLink } from "react-router-dom";
import logoImg from "../../assets/image/ism-online-logo_300.png"
import { router } from "../..";

import styles from "./index.module.css"
import "./index.css"
import { useState } from "react";

const Logo = ({ hideMenu }) => {
    return (
        <span className={`d-flex align-items-center text-white text-decoration-none ${styles.logoLink} ${hideMenu ? styles.noMenu : ''}`}>
            <img src={logoImg} className={`rounded-4 ${styles.headerLogo}`} alt="iSMART Online" />
        </span>
    )
}

function Header({ hideMenu }) {
    const { routes } = router
    const [isShowDropdown, setIsShowDropdown] = useState(false)

    const renderMenu = routes.filter(route => !route.hideMenu).map(route => {
        return (
            <li key={route.basePath} className="nav-item">
                <NavLink to={route.basePath} className={`nav-link`}>{route.label}</NavLink>
            </li>
        )
    })
    return (
        hideMenu
            ?
            <Logo hideMenu={hideMenu} />
            :
            <header className={`${hideMenu ? 'p-0' : 'p-3'}`}>
                <div className="container">
                    <div className={`d-flex align-items-center justify-content-between`}>
                        <Logo hideMenu={hideMenu} />

                        {
                            !hideMenu &&
                            <nav className="navbar navbar-expand-lg navbar-dark mx-lg-auto">
                                <button className="navbar-toggler" type="button" onClick={() => setIsShowDropdown(!isShowDropdown)}>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className={`collapse navbar-collapse px-2 rounded-3 text-center ${isShowDropdown ? 'show' : ''}`}>
                                    <ul className="navbar-nav">
                                        {renderMenu}
                                    </ul>
                                </div>
                            </nav>
                        }
                    </div>
                </div>
            </header>
    )
}

export default Header