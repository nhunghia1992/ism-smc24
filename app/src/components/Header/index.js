import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/image/ism-online-logo_300.png"
import styles from "./index.module.css"
import { router } from "../..";

const Logo = (props) => {
    const { hideMenu } = props
    return (
        <span className={`d-flex align-items-center text-white text-decoration-none ${styles.logoLink} ${hideMenu ? styles.noMenu : ''}`}>
            <img src={logoImg} className={`rounded-4 ${styles.headerLogo}`} alt="iSMART Online" />
        </span>
    )
}

function Header(props) {
    const { hideMenu } = props
    const { routes } = router

    const navigate = useNavigate()

    const location = useLocation()
    const locationBasePath = '/' + location.pathname.split('/')[1]

    const handleClick = (basePath) => {
        if (locationBasePath === basePath) return
        navigate(basePath)
    }

    const renderMenu = routes.filter(route => !route.hideMenu).map(route => {
        const linkColorClass = locationBasePath === route.basePath ? 'text-secondary' : 'text-white'
        return (
            <li key={route.basePath}>
                <span onClick={() => handleClick(route.basePath)} className={`nav-link px-2 ${linkColorClass}`}>{route.label}</span>
            </li>
        )
    })
    return (
        hideMenu
            ?
            <Logo hideMenu={hideMenu} />
            :
            <header className={`text-bg-dark ${hideMenu ? 'p-0' : 'p-3'}`}>
                <div className="container">
                    <div className={`d-flex align-items-center justify-content-between`}>
                        <Logo hideMenu={hideMenu} />

                        {
                            !hideMenu &&
                            <ul className="nav mx-lg-auto">
                                {renderMenu}
                            </ul>
                        }

                    </div>
                </div>
            </header>
    )
}

export default Header