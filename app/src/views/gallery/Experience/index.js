import { useEffect, useState } from "react"
import { apiGet } from "../../../helpers"
import { API_ENDPOINTS } from "../../../define"
import Banner from "../Banner"
import Header from "../../../components/Header"
import Navigation from "../Gallery/Navigation"

function Experience() {
    const [program, setProgram] = useState({})
    // const []

    useEffect(() => {
        const getData = async () => {
            const [program] = await Promise.all([
                apiGet(API_ENDPOINTS.PROGRAM)
            ])
            
            if (program?.data) setProgram(program?.data);
        }
        getData()
    }, [])

    return (
        <>
            <Header hideMenu={true} />

            <Navigation />

            <Banner program={program} />
        </>
    )
}

export default Experience