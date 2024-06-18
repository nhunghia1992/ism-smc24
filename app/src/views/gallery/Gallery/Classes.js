import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_ONE_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaUrl } from "../../../helpers"

function Classes(props) {
    const { classes } = props

    const renderClasses = classes.map(classItem => {
        return (
            <div key={classItem.id} className="text-center p-3">
                <div className="px-lg-5">
                    <img src={getMediaUrl(classItem.attributes?.media)} className={`w-100 m-auto rounded-5`} alt="Class" />
                </div>
                <p>{classItem.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]}>{classItem.attributes?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid g-0" id="classes">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Our Classes</h2>
                    <Slider {...CAROUSEL_ONE_SETTINGS} infinite={classes.length === 1 ? false : true}>
                        {renderClasses}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Classes