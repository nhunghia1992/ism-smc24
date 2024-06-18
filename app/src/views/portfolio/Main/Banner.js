// import { useEffect, useState } from "react"
// import { apiGet } from "../../../helpers"
// import Markdown from "react-markdown"
// import rehypeRaw from "rehype-raw"
import styles from "./Banner.module.css"
// import { API_ENDPOINTS } from "../../../define"
import mainImg from "../../../assets/image/main.png"

function Banner() {
    // const [program, setProgram] = useState({})
    // useEffect(() => {
    //     const getProgram = async () => {
    //         const params = {
    //             populate: 'banner'
    //         }
    //         const res = await apiGet(API_ENDPOINTS.PROGRAM, params)
    //         const program = res?.data

    //         if (!program) return

    //         setProgram(program)
    //     }
    //     getProgram()
    // }, [])
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center`}>
            <img src={mainImg} alt="My Summer Camp Portfolio 2024" className={`${styles.mainImg}`} />
        </div>
    )
}

export default Banner