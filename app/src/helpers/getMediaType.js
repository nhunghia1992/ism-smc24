function getMediaType(media) {
    const type = media?.data?.attributes?.mime
    return type ?? ''
}

export default getMediaType