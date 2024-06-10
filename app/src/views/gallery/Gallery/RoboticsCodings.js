import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaType, getMediaUrl } from "../../../helpers"
import MediaPreview from "../../../components/MediaPreview"

function RoboticsCodings(props) {
    const { roboticsCodings } = props

    const renderRoboticsCodings = roboticsCodings.map(roboticsCoding => {
        return (
            <div key={roboticsCoding.id} className="text-center p-3">
                <div className="px-lg-5">
                    <MediaPreview src={getMediaUrl(roboticsCoding.attributes?.details?.media)} type={getMediaType(roboticsCoding.attributes?.details?.media)} ratio="16x9" />
                </div>
                <p>{roboticsCoding.attributes?.user?.data?.attributes?.name} - {roboticsCoding.attributes?.user?.data?.attributes?.class?.data?.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]}>{roboticsCoding.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid g-0" id="robotics_codings">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">It's worth trying robotics and coding</h2>
                    <Slider {...CAROUSEL_SETTINGS} infinite={roboticsCodings.length === 1 ? false : true}>
                        {renderRoboticsCodings}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default RoboticsCodings