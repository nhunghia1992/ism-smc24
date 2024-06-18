import Header from "../../../components/Header"
import Banner from "./Banner"
import Form from "./Form"

function Main() {
    return (
        <div className="bg-ism bg-portfolio">
            <Header hideMenu={true} />
            <Banner />
            <Form />
        </div>
    )
}

export default Main