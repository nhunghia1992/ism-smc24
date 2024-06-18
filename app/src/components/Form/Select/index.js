import formStyles from "../index.module.css"

function Select(props) {
    const { options } = props
    const renderOptions = options.map(option => {
        return (
            <option key={option.value} value={option.value}>{option.label}</option>
        )
    })
    return (
        <select className={`form-select rounded-pill ${formStyles.customInput}`} {...props}>
            <option value=""></option>
            {renderOptions}
        </select>
    )
}

export default Select