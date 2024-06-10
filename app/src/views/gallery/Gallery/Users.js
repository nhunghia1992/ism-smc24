import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { CAROUSEL_SETTINGS, ROUTES } from "../../../define"
import Slider from "react-slick"
import { getMediaUrl } from "../../../helpers"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Users(props) {
    const { users } = props

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
            <div key={user.id} className="text-center p-3">
                <p>{user.name} - {user.class?.name}</p>
                <div className="px-lg-5">
                    <img
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={() => handleMouseUp(user.username)}
                        src={getMediaUrl(user.image)}
                        className={`w-100 m-auto rounded-5`}
                        alt="User"
                    />
                </div>
                <Markdown rehypePlugins={[rehypeRaw]}>{user.portfolioAbout}</Markdown>
            </div>
        )
    })

    return (
        <div className="container-fluid g-0" id="users">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Stemverse Kids</h2>
                    <Slider {...CAROUSEL_SETTINGS} infinite={users.length === 1 ? false : true}>
                        {renderUsers}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Users