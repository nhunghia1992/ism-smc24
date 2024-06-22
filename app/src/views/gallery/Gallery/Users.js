import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_THREE_SETTINGS, ROUTES } from "../../../define"
import Slider from "react-slick"
import { getMediaUrl } from "../../../helpers"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import styles from "./User.module.css"

function Users({ users }) {
    const [isMouseMoving, setIsMouseMoving] = useState(false)
    const navigate = useNavigate()

    const handleMouseMove = () => {
        setIsMouseMoving(true)
    }

    const handleMouseUp = (username) => {
        if (isMouseMoving) return
        navigate(`${ROUTES.PORTFOLIO}/${username}`)
    }

    const handleMouseDown = () => {
        setIsMouseMoving(false)
    }

    const renderUsers = users.map(user => {
        return (
            <div key={user.id} className="p-3">
                <p className="fs-5 text-center">{user.name} - {user.class?.name}</p>
                <div className="px-lg-5 mb-4">
                    <img
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={() => handleMouseUp(user.username)}
                        src={getMediaUrl(user.image)}
                        className={`w-100 m-auto rounded-4 ${styles.userImg}`}
                        alt={`${user.name} - ${user.class?.name} portfolio`}
                    />
                </div>
                <Markdown rehypePlugins={[rehypeRaw]} className="ck-content">{user.portfolioAbout}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid py-5 g-0" id="users">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center fw-bold mb-4">Stemverse Kids</h2>
                    <Slider {...CAROUSEL_THREE_SETTINGS} infinite={users.length === 1 ? false : true}>
                        {renderUsers}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Users