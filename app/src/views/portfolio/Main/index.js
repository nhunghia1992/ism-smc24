import { useNavigate } from "react-router-dom"
import Header from "../../../components/Header"
import Banner from "./Banner"
import Form from "./Form"
import { useEffect } from "react"
import { ROUTES } from "../../../define"

function Main() {
    const navigate = useNavigate()

    useEffect(() => {
        const localUsername = localStorage.getItem('username')
        if (!localUsername) return;

        navigate(`${ROUTES.PORTFOLIO}/${localUsername}`, { replace: true })
    }, [navigate])

    return (
        <div className="bg-ism bg-portfolio">
            <Header hideMenu={true} />
            <Banner />
            <Form />
        </div>
    )
}

export default Main