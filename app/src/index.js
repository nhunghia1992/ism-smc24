import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Main from './views/portfolio/Main';
import Welcome from './views/portfolio/Welcome';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from './components/Loading';

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ROUTES } from './define';
import Project from './views/portfolio/Project';
import Gallery from './views/gallery/Gallery';
import Experience from './views/gallery/Experience';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        basePath: ROUTES.HOME,
        element: <Main />,
        label: 'Trang chủ'
    },
    {
        path: `${ROUTES.PORTFOLIO}/:username?`,
        basePath: ROUTES.PORTFOLIO,
        element: <Welcome />,
        label: 'Portfolio'
    },
    {
        path: `${ROUTES.PROJECT}/:username?/:weekID?`,
        basePath: ROUTES.PROJECT,
        element: <Project />,
        label: 'Project'
    },
    {
        path: `${ROUTES.GALLERY}/`,
        basePath: ROUTES.GALLERY,
        element: <Gallery />,
        label: 'Gallery',
        hideMenu: true
    },
    {
        path: `${ROUTES.EXPERIENCE}/`,
        basePath: ROUTES.EXPERIENCE,
        element: <Experience />,
        label: 'Experience',
        hideMenu: true
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
        <Loading />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
