function getMediaType(media) {
    const type = media?.mime ?? media?.data?.attributes?.mime
    return type ?? ''
}

export default getMediaType