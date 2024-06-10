import { useEffect, useState } from "react"
import { Input, Select } from "../../../components/Form"
import { apiGet } from "../../../helpers"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { API_ENDPOINTS, ROUTES } from "../../../define"

function Form() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        grade: ''
    })

    const [grades, setGrades] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getGrades = async () => {
            const res = await apiGet(API_ENDPOINTS.GRADES)
            if (!res.data || !res.data.length) return

            const gradesMap = res.data.map(grade => {
                return {
                    label: grade.attributes.name,
                    value: grade.attributes.number
                }
            })
            setGrades(gradesMap)
        }
        getGrades()
    }, [])

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const params = {
            'filters[name][$eq]': userInfo.name,
            'filters[phone][$eq]': userInfo.phone,
            'filters[grade][number][$eq]': userInfo.grade
        }
        const [user] = await apiGet(API_ENDPOINTS.USERS, params)
        if (!user) {
            toast.error('Student not found!', { theme: 'colored' })
            return
        }
        
        if (!user.username) {
            toast.error('Username not found!', { theme: 'colored' })
            return
        }

        localStorage.setItem('username', user.username)
        navigate(`${ROUTES.PORTFOLIO}/${user.username}`)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label text-end">Full name</label>
                            <div className="col-sm-8">
                                <Input type="text" name="name" value={userInfo.name} onChange={handleChange} required={true} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label text-end">Parent's phone</label>
                            <div className="col-sm-8">
                                <Input type="tel" name="phone" value={userInfo.phone} onChange={handleChange} required={true} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label text-end">Grade</label>
                            <div className="col-sm-8">
                                <Select name="grade" value={userInfo.grade} onChange={handleChange} options={grades} required={true} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <button type="submit" className="btn btn-primary">CONTINUE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form