import Header from "../../../components/Header"
import Navigation from "./Navigation"

import galleryStyles from "../index.module.css"
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react"
import { apiGet, getMediaType, getMediaUrl } from "../../../helpers"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

// import styles from "./index.module.css"
import MediaPreview from "../../../components/MediaPreview"
import Teachers from "./Teachers"
import Classes from "./Classes"
import Stories from "./Stories"
import Projects from "./Projects"
import RoboticsCodings from "./RoboticsCodings"
import Users from "./Users"
import Banner from "../Banner"
import { API_ENDPOINTS } from "../../../define"

function Gallery() {
    const [program, setProgram] = useState({})
    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])
    const [stories, setStories] = useState([])
    const [projects, setProjects] = useState([])
    const [roboticsCodings, setRoboticsCodings] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getData = async () => {
            const programParams = {
                populate: 'objectiveMedia, objectives, aboutIsmartVideo'
            }
            const teacherParams = {
                populate: 'media'
            }
            const classParams = {
                populate: 'media'
            }
            const subjectParams = {
                'filters[details][featured][$eq]': true,
                populate: 'details.media, user.class',
                sort: 'details.featuredOrder:desc',
                // 'pagination[limit]': 5
            }
            const userParams = {
                populate: 'image, class'
            }
            const [program, teachers, classes, stories, projects, roboticsCodings, users] = await Promise.all([
                apiGet(API_ENDPOINTS.PROGRAM, programParams),
                apiGet(API_ENDPOINTS.TEACHERS, teacherParams),
                apiGet(API_ENDPOINTS.CLASSES, classParams),
                apiGet(API_ENDPOINTS.STORIES, subjectParams),
                apiGet(API_ENDPOINTS.PROJECTS, subjectParams),
                apiGet(API_ENDPOINTS.ROBOTICS_CODINGS, subjectParams),
                apiGet(API_ENDPOINTS.USERS, userParams)
            ])

            if (program?.data) setProgram(program.data);
            if (teachers?.data?.length) setTeachers(teachers.data);
            if (classes?.data?.length) setClasses(classes.data);
            if (stories?.data?.length) setStories(stories.data);
            if (projects?.data?.length) setProjects(projects.data);
            if (roboticsCodings?.data?.length) setRoboticsCodings(roboticsCodings.data);
            if (users?.length) setUsers(users);
        }
        getData()
    }, [])

    const renderObjectives = program?.attributes?.objectives.map(objective => {
        return (
            <div key={objective.id}>
                <p className="mb-2">{objective.title}</p>
                <Markdown rehypePlugins={[rehypeRaw]}>{objective.description}</Markdown>
            </div>
        )
    })

    return (
        <div className="bg-ism bg-gallery">
            <Header hideMenu={true} />

            <Navigation />

            <div className={`${galleryStyles.wrapper}`}>
                {/* Banner */}
                <Banner program={program} />

                {/* About */}
                <div className="container" id="about">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>About ISMART ONLINE</h2>
                            <Markdown rehypePlugins={[rehypeRaw]}>{program?.attributes?.aboutIsmart}</Markdown>
                            <MediaPreview src={getMediaUrl(program?.attributes?.aboutIsmartVideo)} type={getMediaType(program?.attributes?.aboutIsmartVideo)} hideZoom={true} hideBorder={true} />
                        </div>
                    </div>
                </div>

                {/* Objectives */}
                <div className="container" id="objectives">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <h2>
                                Objectives<br />
                                Mục tiêu của SUMMER CAMP
                            </h2>
                            <div>
                                {renderObjectives}
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <MediaPreview src={getMediaUrl(program?.attributes?.objectiveMedia)} type={getMediaType(program?.attributes?.objectiveMedia)} hideZoom={true} hideBorder={true} />
                        </div>
                    </div>
                </div>

                {/* Teacher */}
                <Teachers teachers={teachers} />

                {/* Our Class */}
                <Classes classes={classes} />

                {/* Stories */}
                <Stories stories={stories} />

                {/* Projects */}
                <Projects projects={projects} />

                {/* Robotics & Codings */}
                <RoboticsCodings roboticsCodings={roboticsCodings} />

                {/* Users */}
                <Users users={users} />
            </div>

            <Footer />
        </div>
    )
}

export default Gallery