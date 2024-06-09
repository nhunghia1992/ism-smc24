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
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '300px',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                centerPadding: '150px'
            }
        },
        {
            breakpoint: 576,
            settings: {
                centerPadding: '50px'
            }
        }
    ]
}

export {
    ROUTES,
    CAROUSEL_SETTINGS
}