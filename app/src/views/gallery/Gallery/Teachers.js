import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaUrl } from "../../../helpers"

import styles from "./Teachers.module.css"

function Teachers(props) {
    const { teachers } = props

    const renderTeachers = teachers.map(teacher => {
        return (
            <div key={teacher.id} className="text-center p-3">
                <div className={`${styles.teacherImgWrapper}`}>
                    <div className={`ratio ratio-1x1`}>
                        <img src={getMediaUrl(teacher.attributes?.media)} className={`img-fluid rounded-circle ${styles.teacherImg}`} alt="Teacher" />
                    </div>
                </div>
                <p>{teacher.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]}>{teacher.attributes?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid g-0" id="teachers">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Our Teachers</h2>
                    <Slider {...CAROUSEL_SETTINGS} slidesToShow={2} infinite={teachers.length === 1 ? false : true}>
                        {renderTeachers}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Teachers