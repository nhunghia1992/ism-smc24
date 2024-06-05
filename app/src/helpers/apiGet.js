import axios from "axios"
import handleRequestError from "./handleRequestError"

async function apiGet(endpoint, params) {
    const apiUrl = process.env.REACT_APP_API_URL + endpoint
    const res = await axios.get(apiUrl, { params }).catch(handleRequestError)
    return res?.data
}

export default apiGet