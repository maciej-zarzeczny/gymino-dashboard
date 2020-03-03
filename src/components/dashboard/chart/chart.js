import React, { Component } from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import './chart.scss';

function getFullName(label) {
    switch(label) {
        case 'Sty':
            return 'Styczeń';
        case 'Lut':
            return 'Luty';
        case 'Mar':
            return 'Marzec';
        case 'Kwi':
            return 'Kwiecień';
        case 'Maj':
            return 'Maj';
        case 'Cze':
            return 'Czerwiec';
        case 'Lip':
            return 'Lipiec';
        case 'Sie':
            return 'Sierpień';
        case 'Wrz':
            return 'Wrzesień';
        case 'Paź':
            return 'Październik';
        case 'Lis':
            return 'Listopad';
        case 'Gru':
            return 'Grudzień';
        default:
            return '';
    }
    
  }

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">        
            <p className="custom-label">{ getFullName(label) }</p>
            <p className="custom-intro">{ payload[0].value } zł</p>      
        </div>             
      );
    }
  
    return null;
  }

class Chart extends Component {
    state = {
        data: [
            {name: 'Sty', fullName: 'Styczeń', zarobki: 1000 },
            {name: 'Lut', fullName: 'Luty', zarobki: 1230 },
            {name: 'Mar', fullName: 'Styczeń', zarobki: 853 },
            {name: 'Kwi', fullName: 'Styczeń', zarobki: 632 },
            {name: 'Maj', fullName: 'Styczeń', zarobki: 1890 },
            {name: 'Cze', fullName: 'Styczeń', zarobki: 2390 },
            {name: 'Lip', fullName: 'Styczeń', zarobki: 3490 },
            {name: 'Sie', fullName: 'Styczeń', zarobki: 2359 },
            {name: 'Wrz', fullName: 'Styczeń', zarobki: 2478 },
            {name: 'Paź', fullName: 'Styczeń', zarobki: 3490 },
            {name: 'Lis', fullName: 'Styczeń', zarobki: 743 },
            {name: 'Gru', fullName: 'Styczeń', zarobki: 1479 },
        ]
    } 
    render() {
        return (                      
            <ResponsiveContainer width="100%" height={ 450 }>
                <BarChart data={ this.state.data } margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="PLN" />
                    <Tooltip content={ <CustomTooltip /> }/>                    
                    <Bar dataKey="zarobki" fill="#1A1A1ACC" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default Chart
