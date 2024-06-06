function getMediaUrl(media) {
    const url = media?.url ?? media?.data?.attributes?.url
    if (!url) return ''

    return url.includes('http') ? url : process.env.REACT_APP_CMS_URL + url
}

export default getMediaUrl