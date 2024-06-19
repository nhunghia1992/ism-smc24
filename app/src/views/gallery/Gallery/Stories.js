import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_ONE_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaType, getMediaUrl } from "../../../helpers"
import MediaPreview from "../../../components/MediaPreview"

function Stories(props) {
    const { stories } = props

    const renderStories = stories.map(story => {
        return (
            <div key={story.id} className="text-center p-3">
                <div className="px-lg-5 mb-4">
                    <MediaPreview src={getMediaUrl(story.attributes?.details?.media)} type={getMediaType(story.attributes?.details?.media)} ratio="16x9" />
                </div>
                <p className="fs-5">{story.attributes?.user?.data?.attributes?.name} - {story.attributes?.user?.data?.attributes?.class?.data?.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{story.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid py-5 g-0" id="stories">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center fw-bold mb-4">Enjoy Our Stories</h2>
                    <Slider {...CAROUSEL_ONE_SETTINGS} infinite={stories.length === 1 ? false : true}>
                        {renderStories}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Stories