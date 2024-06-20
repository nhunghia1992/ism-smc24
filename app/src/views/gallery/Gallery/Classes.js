import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_ONE_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaUrl } from "../../../helpers"

function Classes({ classes }) {
    const renderClasses = classes.map(classItem => {
        return (
            <div key={classItem.id} className="text-center p-3">
                <div className="px-lg-5 mb-4">
                    <img src={getMediaUrl(classItem.attributes?.media)} className={`w-100 m-auto rounded-5`} alt="Class" />
                </div>
                <p className="fs-5">{classItem.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{classItem.attributes?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid py-5 g-0" id="classes">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center fw-bold mb-4">Our Classes</h2>
                    <Slider {...CAROUSEL_ONE_SETTINGS} infinite={classes.length === 1 ? false : true}>
                        {renderClasses}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Classes