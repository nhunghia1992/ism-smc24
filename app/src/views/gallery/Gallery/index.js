import Header from "../../../components/Header"
import Navigation from "./Navigation"

import galleryStyles from "../index.module.css"
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react"
import { apiGet, getMediaType, getMediaUrl } from "../../../helpers"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import styles from "./index.module.css"
import MediaPreview from "../../../components/MediaPreview"

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
            const subjectParams = {
                'filters[details][featured][$eq]': true,
                populate: 'details.media',
                sort: 'details.featuredOrder:desc',
                // 'pagination[limit]': 5
            }
            const [program, teachers, classes, stories, projects, roboticsCodings, users] = await Promise.all([
                apiGet('/program', programParams),
                apiGet('/teachers', teacherParams),
                apiGet('/classes'),
                apiGet('/stories', subjectParams),
                apiGet('/projects', subjectParams),
                apiGet('/robotics-codings', subjectParams),
                apiGet('/users')
            ])

            if (program?.data) setProgram(program?.data);
            if (teachers?.data?.length) setTeachers(teachers?.data);
            if (classes?.data?.length) setClasses(classes?.data);
            if (stories?.data?.length) setStories(stories?.data);
            if (projects?.data?.length) setProjects(projects?.data);
            if (roboticsCodings?.data?.length) setRoboticsCodings(roboticsCodings?.data);
            if (users?.length) setUsers(users);
        }
        getData()
    }, [])

    return (
        <>
            <Header hideMenu={true} />

            <Navigation />

            <div className={galleryStyles.wrapper}>
                {/* Banner */}
                <div className={`d-flex flex-column align-items-center justify-content-center p-3 ${styles.banner}`} id="banner">
                    <h1>{program?.attributes?.galleryTitle}</h1>
                    <h2>
                        <Markdown rehypePlugins={[rehypeRaw]}>{program?.attributes?.galleryDescription}</Markdown>
                    </h2>
                </div>

                {/* About */}
                <div className="container" id="about">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>About ISMART ONLINE</h2>
                            <Markdown rehypePlugins={[rehypeRaw]}>{program?.attributes?.aboutIsmart}</Markdown>
                            <MediaPreview src={getMediaUrl(program?.attributes?.aboutIsmartVideo)} type={getMediaType(program?.attributes?.aboutIsmartVideo)} ratio="16x9" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Gallery