import styles from "./index.module.css"

import bannerImg from "../../../assets/image/gallery.png"

function Banner() {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.banner}`} id="banner">
            <img src={bannerImg} alt="Summer Camp Digital Gallery" className={`img-fluid ${styles.bannerImg}`} />
        </div>
    )
}

export default Banner