import styles from "./Banner.module.css"
import mainImg from "../../../assets/image/gallery.png"

function Banner() {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.main}`}>
            <img src={mainImg} alt="My Portfolio | iSMART Online | iSMART Education" className={`img-fluid ${styles.mainImg}`} />
        </div>
    )
}

export default Banner