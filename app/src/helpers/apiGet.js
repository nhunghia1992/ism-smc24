import axios from "axios"
import handleRequestError from "./handleRequestError"

async function apiGet(endpoint, params) {
    const apiUrl = process.env.REACT_APP_CMS_URL + '/api'
    const endpointUrl = apiUrl + endpoint
    const res = await axios.get(endpointUrl, { params }).catch(handleRequestError)
    return res?.data
}

export default apiGet