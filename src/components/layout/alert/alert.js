import React from 'react'
import './alert.scss'

import { NavLink } from 'react-router-dom'

function Alert({ content }) {    
    return (
        <NavLink to="/edit-data">
            <div className="red lighten-3 alert-wrapper">
                <div className="row valign-wrapper no-bottom-margin">
                    <div className="col s12 alert-content">
                        <p className="valign-wrapper">{ content }<i className="material-icons small">keyboard_arrow_right</i></p>
                    </div>                    
                </div>
            </div>
        </NavLink>
    )
}

export default Alert
