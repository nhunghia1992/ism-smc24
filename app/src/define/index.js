const ROUTES = {
    HOME: '/',
    PORTFOLIO: '/portfolio',
    GALLERY: '/gallery',
    PROJECT: '/project',
}

const CAROUSEL_SETTINGS = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1
            }
        }
    ]
}

export {
    ROUTES,
    CAROUSEL_SETTINGS
}