import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_THREE_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaUrl } from "../../../helpers"

import styles from "./Teachers.module.css"

function Teachers({ teachers }) {
    const renderTeachers = teachers.map(teacher => {
        return (
            <div key={teacher.id} className="text-center p-3">
                <div className={`mb-3 ${styles.teacherImgWrapper}`}>
                    <div className={`ratio ratio-1x1`}>
                        <img src={getMediaUrl(teacher.attributes?.media)} className={`img-fluid rounded-circle ${styles.teacherImg}`} alt="Teacher" />
                    </div>
                </div>
                <p className="mb-2 fs-5">{teacher.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{teacher.attributes?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid py-5 g-0" id="teachers">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center fw-bold mb-4">Our Teachers</h2>
                    <Slider {...CAROUSEL_THREE_SETTINGS} infinite={teachers.length === 1 ? false : true}>
                        {renderTeachers}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Teachers