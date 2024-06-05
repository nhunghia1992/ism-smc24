import Header from "../../../components/Header"
import Banner from "./Banner"
import Form from "./Form"

function Main() {
    return (
        <>
            <Header hideMenu={true} />
            <Banner />
            <Form />
        </>
    )
}

export default Main