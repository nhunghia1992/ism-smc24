import Header from "../../../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { apiGet, getMediaType, getMediaUrl } from "../../../helpers"
import { toast } from "react-toastify"
import { API_ENDPOINTS, CAROUSEL_THREE_SETTINGS, ROUTES } from "../../../define"
import MediaPreview from "../../../components/MediaPreview"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Slider from "react-slick"
import Footer from "../../../components/Footer"

import styles from "./index.module.css"
import portfolioStyles from "../index.module.css"

function Project() {
    const navigate = useNavigate()
    const { username, weekID } = useParams()

    const [user, setUser] = useState({})
    const [week, setWeek] = useState({})
    const [story, setStory] = useState({})
    const [project, setProject] = useState({})
    const [roboticsCoding, setRoboticsCoding] = useState({})
    const [comments, setComments] = useState([]) // aka comment in cms

    useEffect(() => {
        if (username && weekID) {
            // get user info
            const getUserWeek = async () => {
                const userParams = {
                    'filters[username][$eq]': username,
                    populate: 'class,image',
                    'pagination[limit]': 1
                }
                const [users, week] = await Promise.all([apiGet(API_ENDPOINTS.USERS, userParams), apiGet(`${API_ENDPOINTS.WEEKS}/${weekID}`)])
                if (!users || !users.length || !week || !week.data) {
                    toast.error('Project not found!', { theme: 'colored' })
                    return
                }

                setUser(users[0])
                setWeek(week.data)
            }
            getUserWeek()
            return
        }

        // check stored username in localStorage if not present in url
        const localUsername = localStorage.getItem('username')
        const localWeekID = localStorage.getItem('weekID')

        if (!localUsername || !localWeekID) {
            navigate(ROUTES.PORTFOLIO, { replace: true })
        } else {
            navigate(`${ROUTES.PROJECT}/${localUsername}/${localWeekID}`, { replace: true })
        }
    }, [username, weekID, navigate])

    useEffect(() => {
        if (!user?.id || !week?.id) return;

        const getData = async () => {
            const subjectParams = {
                'filters[users][id][$in]': user.id,
                'filters[week][id][$eq]': week.id,
                populate: 'details.media',
                'pagination[limit]': 1
            }
            const commentParams = {
                'filters[user][id][$eq]': user.id,
                'filters[week][id][$eq]': week.id,
                populate: 'details.media',
            }
            const [stories, projects, roboticsCodings, comments] = await Promise.all([
                apiGet(API_ENDPOINTS.STORIES, subjectParams),
                apiGet(API_ENDPOINTS.PROJECTS, subjectParams),
                apiGet(API_ENDPOINTS.ROBOTICS_CODINGS, subjectParams),
                apiGet(API_ENDPOINTS.COMMENTS, commentParams)
            ])

            if (stories?.data?.length) setStory(stories.data[0]);
            if (projects?.data?.length) setProject(projects.data[0]);
            if (roboticsCodings?.data?.length) setRoboticsCoding(roboticsCodings.data[0]);
            if (comments?.data) setComments(comments.data);
        }
        getData()
    }, [user?.id, week?.id])

    useEffect(() => {
        const element = document.querySelector('.bg-portfolio')
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }, [])

    const renderComments = comments?.map(comment => {
        return (
            <div key={comment.id} className="p-3">
                <div className="px-lg-5">
                    <MediaPreview src={getMediaUrl(comment?.attributes?.details?.media)} type={getMediaType(comment?.attributes?.details?.media)} hideZoom={true} />
                </div>
                <Markdown rehypePlugins={[rehypeRaw]} className="mt-3 ck-content">{comment.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="bg-ism bg-portfolio">
            <Header />

            <div className={portfolioStyles.wrapper}>
                {/* Student info */}
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-6 d-flex align-items-center justify-content-center mb-3 mb-lg-0">
                            <div className="text-center">
                                <h3 className="fw-bold text-uppercase">{user.name}</h3>
                                <h3 className="fw-bold fst-italic">{user.class?.name}</h3>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <MediaPreview src={getMediaUrl(user.image)} type={getMediaType(user.image)} />
                        </div>
                    </div>
                </div>

                {/* Week title */}
                <div className={styles.weekTitle}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 py-3">
                                <h2 className="m-0 fw-bold">{week.attributes?.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Story */}
                {
                    story.id > 0 &&
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center fw-bold mb-4">MY STORY</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-3 mb-lg-0">
                                <MediaPreview src={getMediaUrl(story.attributes?.details?.media)} type={getMediaType(story.attributes?.details?.media)} ratio="16x9" />
                            </div>
                            <div className="col-lg-6 d-flex align-items-center mb-3 mb-lg-0">
                                <div className="flex-grow-1">
                                    <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{story.attributes?.details?.description}</Markdown>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Project */}
                {
                    project.id > 0 &&
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center fw-bold mb-4">MY SCIENCE PROJECT</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 order-lg-2 mb-3 mb-lg-0">
                                <MediaPreview src={getMediaUrl(project.attributes?.details?.media)} type={getMediaType(project.attributes?.details?.media)} ratio="16x9" />
                            </div>
                            <div className="col-lg-6 order-lg-1 d-flex align-items-center mb-3 mb-lg-0">
                                <div className="flex-grow-1">
                                    <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{project.attributes?.details?.description}</Markdown>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Robotics & Coding */}
                {
                    roboticsCoding.id > 0 &&
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center fw-bold mb-4">MY ROBOTICS/CODING</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-3 mb-lg-0">
                                <MediaPreview src={getMediaUrl(roboticsCoding.attributes?.details?.media)} type={getMediaType(roboticsCoding.attributes?.details?.media)} ratio="16x9" />
                            </div>
                            <div className="col-lg-6 d-flex align-items-center mb-3 mb-lg-0">
                                <div className="flex-grow-1">
                                    <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{roboticsCoding.attributes?.details?.description}</Markdown>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Achievement / Comment */}
                {
                    comments.length > 0 &&
                    <div className="container-fluid g-0 py-5">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center fw-bold mb-4">MY ACHIEVEMENT</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Slider {...CAROUSEL_THREE_SETTINGS} infinite={comments.length === 1 ? false : true}>
                                    {renderComments}
                                </Slider>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Footer />
        </div>
    )
}

export default Project