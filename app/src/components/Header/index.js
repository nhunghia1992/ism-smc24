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
                                <button className={`${styles.menuBtn}`} onClick={() => setIsShowDropdown(!isShowDropdown)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z" />
                                    </svg>
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
                            <ul className="navbar navbar-dark navbar-nav">
                                <li className="nav-item">
                                    <button className={`${styles.menuBtn}`} onClick={handleLogout} title="Logout">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M505 273c9.4-9.4 9.4-24.6 0-33.9L377 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L184 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273zM168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z" />
                                        </svg>
                                    </button>
                                    <span className="nav-link d-none d-lg-block" role="button" onClick={handleLogout}>Logout</span>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </header>
    )
}

export default Header