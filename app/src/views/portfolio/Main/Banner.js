import styles from "./Banner.module.css"
import mainImg from "../../../assets/image/main.png"

function Banner() {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.main}`}>
            <img src={mainImg} alt="My Summer Camp Portfolio 2024" className={`img-fluid ${styles.mainImg}`} />
        </div>
    )
}

export default Banner