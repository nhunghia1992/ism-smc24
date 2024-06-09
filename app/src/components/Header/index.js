import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/image/ism-online-logo_300.png"
import styles from "./index.module.css"
import { router } from "../..";
import { ROUTES } from "../../define";

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
    
    const renderMenu = routes.map(route => {
        const linkColorClass = locationBasePath === route.basePath  ? 'text-secondary' : 'text-white'
        return (
            <li key={route.basePath}>
                <span onClick={() => handleClick(route.basePath)} className={`nav-link px-2 ${linkColorClass}`}>{route.label}</span>
            </li>
        )
    })
    return (
        <header className={`text-bg-dark ${hideMenu ? 'p-0' : 'p-3'}`}>
            <div className="container">
                <div className={`d-flex flex-wrap align-items-center justify-content-center`}>
                    <span onClick={() => navigate(ROUTES.HOME)} className={`d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none ${styles.logoLink}`}>
                        <img src={logoImg} className={`rounded-4 ${styles.headerLogo}`} alt="iSMART Online" />
                    </span>

                    {
                        !hideMenu &&
                        <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
                            {renderMenu}
                        </ul>
                    }

                </div>
            </div>
        </header>
    )
}

export default Header