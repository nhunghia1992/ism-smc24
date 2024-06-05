import formStyles from "../index.module.css"

function Input(props) {
    return (
        <input className={`form-control ${formStyles.customInput}`} {...props} />
    )
}

export default Input