import axios from "axios"
import handleRequestError from "./handleRequestError"

async function apiPost(endpoint, payload) {
    const apiUrl = process.env.REACT_APP_CMS_URL + '/api'
    const endpointUrl = apiUrl + endpoint
    const res = await axios.post(endpointUrl, payload).catch(handleRequestError)
    return res?.data
}

export default apiPost