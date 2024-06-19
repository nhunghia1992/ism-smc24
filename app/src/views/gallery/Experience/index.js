import { useEffect, useState } from "react"
import { apiGet, getMediaType, getMediaUrl } from "../../../helpers"
import { API_ENDPOINTS, CAROUSEL_ONE_SETTINGS } from "../../../define"
import Banner from "../Banner"
import Header from "../../../components/Header"
import Navigation from "../Gallery/Navigation"
import Slider from "react-slick"
import MediaPreview from "../../../components/MediaPreview"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Footer from "../../../components/Footer"

import galleryStyles from "../index.module.css"

const Comment = (props) => {
    const { comment } = props
    return (
        <div className="p-3">
            <div className="px-lg-5 mb-4">
                <MediaPreview src={getMediaUrl(comment?.attributes?.user?.data?.attributes?.image)} type={getMediaType(comment?.attributes?.user?.data?.attributes?.image)} hideZoom={true} hideBorder={true} />
            </div>
            <p className="text-center fs-5">{comment?.attributes?.user?.data?.attributes?.name} - {comment?.attributes?.user?.data?.attributes?.class?.data?.attributes?.name}</p>
            <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{comment.attributes?.details?.description}</Markdown>
        </div>
    )
}

function Experience() {
    const [program, setProgram] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        const getData = async () => {
            const commentParams = {
                populate: 'details.media, user.image, user.class'
            }
            const [program, comments] = await Promise.all([
                apiGet(API_ENDPOINTS.PROGRAM),
                apiGet(API_ENDPOINTS.COMMENTS, commentParams)
            ])

            if (program?.data) setProgram(program.data);
            if (comments?.data?.length) setComments(comments.data);
        }
        getData()
    }, [])

    console.log(comments)

    const studentComments = comments.filter(comment => comment.attributes?.group === 'student')
    const renderStudentComments = studentComments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} />
        )
    })

    const parentComments = comments.filter(comment => comment.attributes?.group === 'parent')
    const renderParentComments = parentComments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} />
        )
    })

    const teacherComments = comments.filter(comment => comment.attributes?.group === 'teacher')
    const renderTeacherComments = teacherComments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} />
        )
    })

    return (
        <div className="bg-ism bg-gallery">
            <Header hideMenu={true} />

            <Navigation />

            <Banner program={program} />

            <div className={galleryStyles.wrapper}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center fw-bold">Our Experience</h2>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-12">
                            <h3 className="text-center">Cảm nhận của Học sinh</h3>
                            <Slider {...CAROUSEL_ONE_SETTINGS} infinite={studentComments.length === 1 ? false : true}>
                                {renderStudentComments}
                            </Slider>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-12">
                            <h3 className="text-center">Cảm nhận của Phụ huynh</h3>
                            <Slider {...CAROUSEL_ONE_SETTINGS} infinite={parentComments.length === 1 ? false : true}>
                                {renderParentComments}
                            </Slider>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center">Cảm nhận của Giáo viên</h3>
                            <Slider {...CAROUSEL_ONE_SETTINGS} infinite={teacherComments.length === 1 ? false : true}>
                                {renderTeacherComments}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Experience