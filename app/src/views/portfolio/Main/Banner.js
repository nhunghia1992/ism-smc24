import { useEffect, useState } from "react"
import { apiGet, getMediaUrl } from "../../../helpers"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styles from "./Banner.module.css"

function Banner() {
    const [program, setProgram] = useState({})
    useEffect(() => {
        const getProgram = async () => {
            const endpoint = '/program'
            const params = {
                populate: 'banner'
            }
            const res = await apiGet(endpoint, params)
            const program = res?.data

            if (!program) return

            setProgram(program)
        }
        getProgram()
    }, [])
    return (
        <div className={`${styles.programBanner} d-flex flex-column align-items-center justify-content-center`} style={{ '--backgroundImage': `url(${getMediaUrl(program?.attributes?.banner)})` }}>
            <div className={styles.programName}>{program?.attributes?.portfolioTitle}</div>
            <div className={styles.programDescription}>
                <Markdown rehypePlugins={[rehypeRaw]}>{program?.attributes?.portfolioDescription}</Markdown>
            </div>
        </div>
    )
}

export default Banner