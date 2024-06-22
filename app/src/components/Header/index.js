import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../../assets/image/ism-online-logo_300.png"
import { router } from "../..";

import styles from "./index.module.css"
import "./index.css"
import { useEffect, useState } from "react";
import { ROUTES } from "../../define";

const Logo = ({ hideMenu }) => {
    return (
        <Link to={ROUTES.GALLERY}>
            <span className={`d-flex align-items-center text-white text-decoration-none ${styles.logoLink} ${hideMenu ? styles.noMenu : ''}`}>
                <img src={logoImg} className={`rounded-4 ${styles.headerLogo}`} alt="iSMART Online" />
            </span>
        </Link>
    )
}

function Header({ hideMenu }) {
    const { routes } = router
    const [username, setUsername] = useState('')
    const [isShowDropdown, setIsShowDropdown] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const localUsername = localStorage.getItem('username')
        if (localUsername) setUsername(localUsername)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('username')
        navigate(ROUTES.HOME)
    }

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

                        {
                            username &&
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <span className="nav-link" role="button" onClick={handleLogout}>Logout</span>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </header>
    )
}

export default Header