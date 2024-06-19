import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "../../../define"

import styles from "./Navigation.module.css"
import axios from "axios"

function Navigation() {
    const [isShow, setIsShow] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (!location.hash) return;

        const scrollToSection = (hash) => {
            const element = document.getElementById(hash.slice(1))
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 200)
            }
        }

        scrollToSection(location.hash)

        // Add a response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            function (response) {
                scrollToSection(location.hash)
                return response
            }
        );

        return () => {
            axios.interceptors.response.eject(responseInterceptor)
        }

    }, [location.hash])

    const gallerySections = [
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
    const renderGalleryLinks = gallerySections.map(section => {
        return (
            <Link key={section.id} to={`${ROUTES.GALLERY}#${section.id}`} onClick={() => setIsShow(false)}>{section.label}</Link>
        )
    })

    return (
        <>
            <button className={`${styles.menuBtn}`} onClick={() => setIsShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z" />
                </svg>
            </button>

            {
                isShow &&
                <div className={`${styles.menuWrapper} d-flex align-items-center`}>
                    <button className={styles.menuBtn} onClick={() => setIsShow(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" />
                        </svg>
                    </button>
                    <div className="container">
                        <div className="row align-items-center justify-content-center align-content-center h-100">
                            <div className="col-lg-5">
                                <div className={`text-center fw-bold display-2`}>Our Tour</div>
                            </div>
                            <div className="col-lg-2">
                                <div className={styles.navigationSeperator}></div>
                            </div>
                            <div className="col-lg-5 d-flex align-items-center justify-content-center">
                                <div className={styles.linksWrapper}>
                                    {renderGalleryLinks}
                                    <Link to={ROUTES.EXPERIENCE} onClick={() => setIsShow(false)}>Our Experience</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Navigation