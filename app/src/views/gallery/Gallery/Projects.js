import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_ONE_SETTINGS } from "../../../define"
import Slider from "react-slick"
import { getMediaType, getMediaUrl } from "../../../helpers"
import MediaPreview from "../../../components/MediaPreview"

function Projects({ projects }) {
    const renderProjects = projects.map(project => {
        const renderUsers = project.attributes?.users?.data?.map(user => {
            return (
                <>
                    {user.attributes?.name} - {user.attributes?.class?.data?.attributes?.name}
                    <br />
                </>
            )
        })

        return (
            <div key={project.id} className="p-3">
                <div className="px-lg-5 mb-4">
                    <MediaPreview src={getMediaUrl(project.attributes?.details?.media)} type={getMediaType(project.attributes?.details?.media)} ratio="16x9" />
                </div>
                <p className="fs-5 text-center">
                    {renderUsers}
                </p>
                <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{project.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid py-5 g-0" id="projects">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center fw-bold mb-4">Let's see our amazing projects</h2>
                    <Slider {...CAROUSEL_ONE_SETTINGS} infinite={projects.length === 1 ? false : true}>
                        {renderProjects}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Projects