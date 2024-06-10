import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaType, getMediaUrl } from "../../../helpers"
import MediaPreview from "../../../components/MediaPreview"

function Projects(props) {
    const { projects } = props

    const renderProjects = projects.map(project => {
        return (
            <div key={project.id} className="text-center p-3">
                <div className="px-lg-5">
                    <MediaPreview src={getMediaUrl(project.attributes?.details?.media)} type={getMediaType(project.attributes?.details?.media)} ratio="16x9" />
                </div>
                <p>{project.attributes?.user?.data?.attributes?.name} - {project.attributes?.user?.data?.attributes?.class?.data?.attributes?.name}</p>
                <Markdown rehypePlugins={[rehypeRaw]}>{project.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid g-0" id="projects">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Let's see our amazing projects</h2>
                    <Slider {...CAROUSEL_SETTINGS} infinite={projects.length === 1 ? false : true}>
                        {renderProjects}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Projects