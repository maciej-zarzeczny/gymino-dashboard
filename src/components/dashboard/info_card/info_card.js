import React from 'react'
import './info_card.scss';

function InfoCard(props) {    
    const { accentColor, title, content, icon } = props;    
    return (        
        <div>
            <div className={ "decoration darken-1 " + accentColor }></div>
            <div className="card-panel white info-card">
                <div className="row valign-wrapper card-content no-padding">
                    <div className="col s10">
                        <span className={ "card-title truncate darken-1 " + accentColor + "-text" }>{ title }</span>                        
                        <span className="card-data truncate">{ content }</span>
                    </div>
                    <div className="col s2 no-padding">
                        <i className="material-icons right card-icon">{ icon }</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
