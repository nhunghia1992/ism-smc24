import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    Font,
} from "@react-pdf/renderer";

import certificateImg from "../../../assets/image/certificate.png"
import certificateTitle from "../../../assets/image/certificateTitle.png"
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import portfolioStyles from "../index.module.css"
import styles from "./index.module.css"

import montFont from "../../../assets/font/Montserrat-Bold.ttf"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, ROUTES } from "../../../define";
import { apiGet } from "../../../helpers";

Font.register({ family: 'Montserrat', src: montFont })

const CertificatePDF = ({ name }) => {
    // Create styles
    const certificateSize = [3508, 2480]
    const pdfStyles = StyleSheet.create({
        viewer: {
            width: '100%', //the pdf viewer will take up all of the width and height
            aspectRatio: certificateSize[0] / (certificateSize[1] + 200),
            display: 'block',
            borderRadius: '0.65rem',
            border: '4px solid var(--main-color)',
            boxShadow: '0 0 10px 4px var(--main-color-lighter)'
        },
        bgImg: {
            width: certificateSize[0],
            height: certificateSize[1]
        },
        name: {
            position: 'absolute',
            left: 0,
            top: '51%',
            width: certificateSize[0],
            color: '#FA450F',
            textAlign: 'center',
            fontSize: 140,
            fontFamily: 'Montserrat',
            textTransform: 'uppercase'
        }
    });

    return (
        <PDFViewer style={pdfStyles.viewer}>
            <Document title="iSMART Summer Camp 2024 Certificate" creator="iSMART Global Academy" producer="iSMART Global Academy" author="iSMART Global Academy" pageLayout="singlePage">
                {/*render a single page*/}
                <Page size={certificateSize}>
                    <View>
                        <Image style={pdfStyles.bgImg} src={certificateImg} />
                        <Text style={pdfStyles.name}>{name}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

function Certificate() {
    const navigate = useNavigate()
    const { username } = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        if (username) {
            // get user info
            const getUserCertificate = async () => {
                const params = { username }
                const users = await apiGet(API_ENDPOINTS.PROGRAM + '/certificate', params)
                if (!users || !users.length) return;

                setUser(users[0])
            }
            getUserCertificate()
            return
        }

        // check stored username in localStorage if not present in url
        const localUsername = localStorage.getItem('username')
        if (!localUsername) {
            navigate(ROUTES.HOME, { replace: true })
        } else {
            navigate(`${ROUTES.CERTIFICATE}/${localUsername}`, { replace: true })
        }
    }, [username, navigate])

    useEffect(() => {
        const element = document.querySelector('.bg-portfolio')
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }, [])

    return (
        <div className="bg-ism bg-portfolio">
            <Header />

            <div className={`${portfolioStyles.wrapper}`}>
                {/* Title */}
                <div className={`d-flex align-items-center justify-content-center ${styles.certificate}`}>
                    <img src={certificateTitle} className={`img-fluid ${styles.certificateTitle}`} alt="Welcome to my portfolio" />
                </div>

                {/* PDF */}
                <div className="container mb-5">
                    {
                        user.id
                            ?
                            <CertificatePDF name={user.name} />
                            :
                            <h2 className="text-center fw-bold">Certificate not found!</h2>
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Certificate