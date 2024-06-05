import axios from "axios"
import handleRequestError from "./handleRequestError"

async function apiPost(endpoint, payload) {
    const apiUrl = process.env.REACT_APP_API_URL + endpoint
    const res = await axios.post(apiUrl, payload).catch(handleRequestError)
    return res?.data
}

export default apiPost