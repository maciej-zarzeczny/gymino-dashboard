import React from 'react'
import './preloader.scss'
import Preloader from './preloader'

function FullPagePreloader() {
    return (
        <div className="full-page-preloader-wrapper">
            <div className="full-page-preloader">
                <Preloader active={ true } />
            </div>            
        </div>
    )
}

export default FullPagePreloader
