const ROUTES = {
    HOME: '/',
    PORTFOLIO: '/portfolio',
    PROJECT: '/project',
    GALLERY: '/gallery',
    EXPERIENCE: '/experience'
}

const API_ENDPOINTS = {
    PROGRAM: '/program',
    TEACHERS: '/teachers',
    CLASSES: '/classes',
    STORIES: '/stories',
    PROJECTS: '/projects',
    ROBOTICS_CODINGS: '/robotics-codings',
    COMMENTS: '/comments',
    USERS: '/users',
    GRADES: '/grades',
    WEEKS: '/weeks'
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
                centerPadding: '50px',
                slidesToShow: 1
            }
        }
    ]
}

export {
    ROUTES,
    API_ENDPOINTS,
    CAROUSEL_SETTINGS
}