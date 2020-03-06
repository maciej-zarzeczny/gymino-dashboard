import React from 'react'
import './preloader.scss';

function Preloader({ active }) {
    return (
        <div className="preloader center">
            <div className={`preloader-wrapper ${active ? "active" : ""}`}>
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default Preloader
