import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import styles from "./index.module.css"

function Banner(props) {
    const { program } = props
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center p-3 ${styles.banner}`} id="banner">
            <h1>{program?.attributes?.galleryTitle}</h1>
            <h2>
                <Markdown rehypePlugins={[rehypeRaw]}>{program?.attributes?.galleryDescription}</Markdown>
            </h2>
        </div>
    )
}

export default Banner