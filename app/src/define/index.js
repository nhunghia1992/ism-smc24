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

const CAROUSEL_ONE_SETTINGS = {
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
            breakpoint: 1200,
            settings: {
                centerPadding: '150px'
            }
        },
        {
            breakpoint: 768,
            settings: {
                centerPadding: '50px',
                slidesToShow: 1
            }
        },
        {
            breakpoint: 576,
            settings: {
                centerPadding: '30px',
                slidesToShow: 1
            }
        }
    ]
}

const CAROUSEL_THREE_SETTINGS = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '200px',
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                centerPadding: '100px',
            }
        },
        {
            breakpoint: 1200,
            settings: {
                centerPadding: '150px',
                slidesToShow: 2
            }
        },
        {
            breakpoint: 992,
            settings: {
                centerPadding: '150px',
                slidesToShow: 2
            }
        },
        {
            breakpoint: 768,
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
    CAROUSEL_ONE_SETTINGS,
    CAROUSEL_THREE_SETTINGS
}