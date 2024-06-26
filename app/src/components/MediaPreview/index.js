import { useState } from "react"
// import { useEffect } from "react"
import { Document, Page } from 'react-pdf'
// import defaultImg from "../../assets/image/default-video-img.jpg"
import noImg from "../../assets/image/no-video-img.jpg"

import styles from "./index.module.css"
import 'react-responsive-modal/styles.css'
import './modal.css'
import { Modal } from 'react-responsive-modal'

function MediaPreview({ src, type, poster, ratio, hideZoom, hideBorder }) {
    const [numPages, setNumPages] = useState();
    const [isZoomed, setIsZoomed] = useState(false)
    const [documentContainerRef, setDocumentContainerRef] = useState()
    const [documentWidth, setDocumentWidth] = useState()

    // Start observing the element when the component is mounted
    // useEffect(() => {
    //     if (!documentContainerRef) return;

    //     const observer = new ResizeObserver(() => {
    //         setDocumentWidth(documentContainerRef?.offsetWidth - 20)
    //     });

    //     observer.observe(documentContainerRef);
    //     return () => {
    //         // Cleanup the observer by unobserving all elements
    //         observer.unobserve(documentContainerRef);
    //     };
    // }, [documentContainerRef])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setDocumentWidth(documentContainerRef?.offsetWidth - 20)
        setNumPages(numPages);
    }

    const mediaPreviewJsx = <>
        {
            type.includes('video') &&
            <video
                src={src}
                controls={true}
                preload="metadata"
                // poster={poster ?? src ? defaultImg : noImg}
                poster={poster}
                className={`${styles.mediaPreview}`}
            />
        }

        {
            type.includes('audio') &&
            <audio
                src={src}
                controls={true}
                preload="none"
                className={`${styles.mediaPreview} ${styles.audio}`}
            />
        }

        {
            type.includes('image') &&
            <img
                src={src}
                className={`${styles.mediaPreview}`}
                alt="Media Preview"
            />
        }

        {
            (type.includes('presentationml') || type.includes('ms-powerpoint')) &&
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${src}`}
                className={`${styles.mediaPreview}`}
                title="Media Preview"
            ></iframe>
        }

        {
            type.includes('pdf') &&
            <div className={`${styles.mediaPreview}`} ref={setDocumentContainerRef}>
                <Document file={`${src}`} onLoadSuccess={onDocumentLoadSuccess}                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={documentWidth}
                        />
                    ))}
                </Document>
            </div>
        }
    </>

    const mediaPlaceholder = <div className={`${styles.mediaPreview}`}>
        <img className={styles.mediaPreviewPlaceholder} src={noImg} alt="Media preview placholder" />
    </div>

    return (
        <>
            <div className={`position-relative rounded-4 overflow-hidden ${ratio ? 'ratio ratio-' + ratio : ''} ${!hideBorder ? styles.mediaPreviewBorder : ''}`}>
                {!isZoomed ? mediaPreviewJsx : mediaPlaceholder}
                {
                    !hideZoom &&
                    <div role="button" className={`${styles.zoomBtn}`} onClick={() => setIsZoomed(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M208 48a160 160 0 1 1 0 320 160 160 0 1 1 0-320zm0 368c48.8 0 93.7-16.8 129.1-44.9L471 505c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L371.1 337.1C399.2 301.7 416 256.8 416 208C416 93.1 322.9 0 208 0S0 93.1 0 208S93.1 416 208 416zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" /></svg>
                    </div>
                }
            </div>
            {
                isZoomed &&
                <>
                    <Modal open={isZoomed} onClose={() => setIsZoomed(false)} center>
                        {mediaPreviewJsx}
                    </Modal>
                </>
            }
        </>
    )
}

export default MediaPreview