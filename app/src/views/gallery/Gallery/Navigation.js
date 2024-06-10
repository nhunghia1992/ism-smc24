import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "../../../define"

import styles from "./Navigation.module.css"

function Navigation() {
    const [isShow, setIsShow] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (!location.hash) return;
        
        const element = document.getElementById(location.hash.slice(1))
        if (element) {
            setTimeout(() => {
                element.scrollIntoView()
            }, 100)
        }
    }, [location.hash])

    const sections = [
        {
            id: 'about',
            label: 'About iSMART Online'
        },
        {
            id: 'objectives',
            label: 'Objectives'
        },
        {
            id: 'classes',
            label: 'Our Class'
        },
        {
            id: 'stories',
            label: 'Story telling'
        },
        {
            id: 'projects',
            label: 'Science Project'
        },
        {
            id: 'robotics_codings',
            label: 'Robotics & Coding'
        }
    ]
    const renderSectionsNavigation = sections.map(section => {
        return (
            <div key={section.id}>
                <Link to={`${ROUTES.GALLERY}#${section.id}`} onClick={() => setIsShow(false)}>{section.label}</Link>
            </div>
        )
    })

    return (
        <>
            <button className={styles.menuBtn} onClick={() => setIsShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={25}>
                    <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z" />
                </svg>
            </button>

            {
                isShow &&
                <div className={`container-fluid ${styles.menuWrapper}`}>
                    <button className={styles.menuBtn} onClick={() => setIsShow(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={25}>
                            <path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" />
                        </svg>
                    </button>
                    <div className="row align-items-center justify-content-center h-100">
                        <div className="col-lg-6">
                            <div className={`text-center`}>Our Tour</div>
                        </div>
                        <div className="col-lg-6">
                            {renderSectionsNavigation}
                            <Link to={ROUTES.EXPERIENCE}>Our Experience</Link>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Navigation