import { useNavigate, useParams } from "react-router-dom"
import Header from "../../../components/Header"
import { ROUTES } from "../../../define"
import { useEffect, useState } from "react"
import { apiGet, getMediaType, getMediaUrl } from "../../../helpers"
import { toast } from "react-toastify"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styles from "./index.module.css"
import MediaPreview from "../../../components/MediaPreview"

const IntroBlock = (props) => {
    const { title, description } = props
    return (
        <>
            <p className={`rounded-pill d-flex align-items-center justify-content-between ${styles.introTitle}`}>
                <span className="mx-auto text-uppercase">{title}</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff" width={15}><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </span>
            </p>
            <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
        </>
    )
}

function Welcome() {
    const navigate = useNavigate()
    const { username } = useParams()

    const [user, setUser] = useState({})
    const [program, setProgram] = useState({})
    const [weeks, setWeeks] = useState([])

    useEffect(() => {
        if (username) {
            // get user info
            const getUser = async () => {
                const params = {
                    'filters[username][$eq]': username,
                    populate: 'class,image'
                }
                const users = await apiGet('/users', params)
                if (!users || !users.length) {
                    toast.error('Student not found!', { theme: 'colored' })
                    return
                }

                setUser(users[0])
            }
            getUser()
            return
        }

        // check stored username in localStorage if not present in url
        const localUsername = localStorage.getItem('username')
        if (!localUsername) {
            navigate(ROUTES.HOME, { replace: true })
        } else {
            navigate(`${ROUTES.PORTFOLIO}/${localUsername}`, { replace: true })
        }
    }, [username, navigate])

    useEffect(() => {
        const getProgram = async () => {
            const endpoint = '/programs'
            const res = await apiGet(endpoint)
            const [program] = res?.data

            if (!program) {
                toast.error('Program not found!', { theme: 'colored' })
                return
            }

            setProgram(program)
        }
        getProgram()
    }, [])

    useEffect(() => {
        const getWeeks = async () => {
            const endpoint = '/weeks'
            const res = await apiGet(endpoint)
            const weeks = res?.data

            if (!weeks) {
                toast.error('Error getting weeks!', { theme: 'colored' })
                return
            }

            setWeeks(weeks)
        }
        getWeeks()
    }, [])

    const handleWeekNavigate = (weekID) => {
        localStorage.setItem('weekID', weekID)
        navigate(`${ROUTES.PROJECT}/${user.username}/${weekID}`)
    }

    const renderActivities = weeks.map(week => {
        return (
            <div className="col-lg-6 mb-5 text-center" key={week.id}>
                <p className="fw-bold">{week.attributes?.name}</p>
                <p>{week.attributes?.description}</p>
                <button className="btn btn-outline-dark rounded-pill px-5" onClick={() => handleWeekNavigate(week.id)}>
                    <small>READMORE...</small>
                </button>
            </div>
        )
    })

    return (
        <>
            <Header />

            {/* Banner */}
            <div className={`d-flex align-items-center justify-content-center ${styles.welcome}`}>
                <Markdown rehypePlugins={[rehypeRaw]}>{user.portfolioWelcome}</Markdown>
            </div>

            {/* Intro */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 text-center">
                        <IntroBlock title={`GIỚI THIỆU VỀ ISMART ONLINE`} description={program.attributes?.aboutIsmart} />
                    </div>
                    <div className="col-lg-6 text-center">
                        <IntroBlock title={`GIỚI THIỆU VỀ ${program.attributes?.name}`} description={program.attributes?.aboutProgram} />
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center fw-bold">ABOUT ME</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <p className="fw-bold text-uppercase">{user.name} - {user.class?.name}</p>
                        <Markdown rehypePlugins={[rehypeRaw]}>{user.portfolioAbout}</Markdown>
                    </div>
                    <div className="col-lg-6">
                        <MediaPreview src={getMediaUrl(user.image)} type={getMediaType(user.image)} />
                    </div>
                </div>
            </div>

            {/* Favorite */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <h2 className="text-center fw-bold">MY FAVOURITE THINGS</h2>
                        <Markdown rehypePlugins={[rehypeRaw]} className="text-center">{user.portfolioFavorite}</Markdown>
                    </div>
                </div>
            </div>

            {/* Activities */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center fw-bold">MY SUMMER CAMP ACTIVITIES</h2>
                    </div>
                </div>
                <div className="row">
                    {renderActivities}
                </div>
            </div>
        </>
    )
}

export default Welcome