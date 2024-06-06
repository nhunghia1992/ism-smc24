import Header from "../../../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { apiGet, getMediaType, getMediaUrl } from "../../../helpers"
import { toast } from "react-toastify"
import { CAROUSEL_SETTINGS, ROUTES } from "../../../define"
import MediaPreview from "../../../components/MediaPreview"
import styles from "./index.module.css"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Slider from "react-slick"

function Project() {
    const navigate = useNavigate()
    const { username, weekID } = useParams()

    const [user, setUser] = useState({})
    const [week, setWeek] = useState({})
    const [story, setStory] = useState({})
    const [project, setProject] = useState({})
    const [roboticsCoding, setRoboticsCoding] = useState({})
    const [achievements, setAchievements] = useState([]) // aka comment in cms

    useEffect(() => {
        if (username && weekID) {
            // get user info
            const getUserWeek = async () => {
                const userParams = {
                    'filters[username][$eq]': username,
                    populate: 'class,image'
                }
                const [users, week] = await Promise.all([apiGet('/users', userParams), apiGet(`/weeks/${weekID}`)])
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
            const params = {
                'filters[user][id][$eq]': user.id,
                'filters[week][id][$eq]': week.id,
                populate: 'details.media'
            }
            const [stories, projects, roboticsCodings, achievements] = await Promise.all([
                apiGet('/stories', params),
                apiGet('/projects', params),
                apiGet('/robotics-codings', params),
                apiGet('/comments', params)
            ])

            if (stories?.data?.length) setStory(stories.data[0]);
            if (projects?.data?.length) setProject(projects.data[0]);
            if (roboticsCodings?.data?.length) setRoboticsCoding(roboticsCodings.data[0]);
            if (achievements?.data) setAchievements(achievements.data);
        }
        getData()
    }, [user?.id, week?.id])

    console.log(achievements)
    const renderAchievements = achievements?.map(achievement => {
        return (
            <div key={achievement.id} className="p-3">
                <MediaPreview src={getMediaUrl(achievement?.attributes?.details?.media)} type={getMediaType(achievement?.attributes?.details?.media)} hideZoom={true} />
                <Markdown rehypePlugins={[rehypeRaw]} className="text-center">{achievement.attributes?.details?.description}</Markdown>
            </div>
        )
    })

    return (
        <>
            <Header />

            {/* Student info */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <p className="fw-bold text-uppercase">{user.name} - {user.class?.name}</p>
                    </div>
                    <div className="col-lg-6">
                        <MediaPreview src={getMediaUrl(user.image)} type={getMediaType(user.image)} />
                    </div>
                </div>
            </div>

            {/* Week title */}
            <div className={styles.weekTitle}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 py-3">
                            <h2 className="m-0">{week.attributes?.name}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">MY STORY</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <MediaPreview src={getMediaUrl(story.attributes?.details?.media)} type={getMediaType(story.attributes?.details?.media)} ratio="16x9" />
                    </div>
                    <div className="col-lg-6 d-flex align-items-center">
                        <Markdown rehypePlugins={[rehypeRaw]}>{story.attributes?.details?.description}</Markdown>
                    </div>
                </div>
            </div>

            {/* Project */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">MY SCIENCE PROJECT</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 order-lg-2">
                        <MediaPreview src={getMediaUrl(project.attributes?.details?.media)} type={getMediaType(project.attributes?.details?.media)} ratio="16x9" />
                    </div>
                    <div className="col-lg-6 order-lg-1 d-flex align-items-center">
                        <Markdown rehypePlugins={[rehypeRaw]}>{project.attributes?.details?.description}</Markdown>
                    </div>
                </div>
            </div>

            {/* Robotics & Coding */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">MY ROBOTICS/CODING</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <MediaPreview src={getMediaUrl(roboticsCoding.attributes?.details?.media)} type={getMediaType(roboticsCoding.attributes?.details?.media)} ratio="16x9" />
                    </div>
                    <div className="col-lg-6 d-flex align-items-center">
                        <Markdown rehypePlugins={[rehypeRaw]}>{roboticsCoding.attributes?.details?.description}</Markdown>
                    </div>
                </div>
            </div>

            {/* Achievement */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">MY ACHIEVEMENT</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Slider {...CAROUSEL_SETTINGS}>
                            {renderAchievements}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project