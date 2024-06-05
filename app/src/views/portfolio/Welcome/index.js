import { useNavigate, useParams } from "react-router-dom"
import Header from "../../../components/Header"
import { ROUTES } from "../../../define"
import { useEffect, useState } from "react"
import { apiGet } from "../../../helpers"
import { toast } from "react-toastify"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styles from "./index.module.css"

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

    useEffect(() => {
        if (username) {
            // get user info
            const getUser = async () => {
                const params = {
                    'filters[username][$eq]': username
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

    return (
        <>
            <Header />
            <div className={`d-flex align-items-center justify-content-center ${styles.welcome}`}>
                <Markdown rehypePlugins={[rehypeRaw]}>{user.portfolioWelcome}</Markdown>
            </div>
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
        </>
    )
}

export default Welcome