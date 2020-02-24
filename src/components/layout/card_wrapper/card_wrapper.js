import React from 'react'
import './card_wrapper.scss';

function CardWrapper({ children, title }) {
    return (
        <div className="card-wrapper z-depth-1">
            <div className="card-wrapper-title">{ title }</div>
            <div className="children">
                { children }
            </div>                
        </div>        
    )
}

export default CardWrapper
