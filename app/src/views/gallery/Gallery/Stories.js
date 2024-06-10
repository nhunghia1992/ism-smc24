import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaType, getMediaUrl } from "../../../helpers"
import MediaPreview from "../../../components/MediaPreview"

function Stories(props) {
    const { stories } = props

    const renderStories = stories.map(story => {
        return (
            <div key={story.id} className="text-center p-3">
                <div className="px-lg-5">
                    <MediaPreview src={getMediaUrl(story.attributes?.details?.media)} type={getMediaType(story.attributes?.details?.media)} ratio="16x9" />
                </div>
                <p>{story.attributes?.user?.data?.attributes?.name} - {story.attributes?.user?.data?.attributes?.class?.data?.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]}>{story.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid g-0" id="stories">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Enjoy Our Stories</h2>
                    <Slider {...CAROUSEL_SETTINGS} infinite={stories.length === 1 ? false : true}>
                        {renderStories}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Stories