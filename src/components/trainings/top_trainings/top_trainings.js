import React, { Component } from 'react';
import './top_trainings.scss';

class TopTraining extends Component {
    state = {
        topTrainings: [
            { 'id': 1, 'imageUrl': 'training_1.jpg', 'name': 'Trening dla początkujących', 'amount': 15000 },
            { 'id': 2, 'imageUrl': 'training_2.jpg', 'name': 'Trening na poręczach', 'amount': 12000 },
            { 'id': 3, 'imageUrl': 'training_3.jpg', 'name': 'Trening w domu dla zaawansowanych', 'amount': 8000 },
            { 'id': 4, 'imageUrl': 'training_4.jpg', 'name': 'Korpus ze stali', 'amount': 5000 },
            { 'id': 5, 'imageUrl': 'training_5.jpg', 'name': 'Naucz się stać na rękach', 'amount': 3000 },
        ]
    }    
    render() {
        const trainings = this.state.topTrainings.map((training) => {
            const amount = training.amount > 1000 ? Math.floor(training.amount / 1000) + ' K' : training.amount;
            return (
                <div className="row valign-wrapper" key={ training.id }>
                    <div className="col s2">
                        <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ training.name } className="responsive-img training-image" />
                    </div>
                    <div className="col s8">
                        <p className="truncate training-name">{ training.name }</p>
                    </div>
                    <div className="col s2">
                        <span className="amount right truncate">{ amount }</span>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div className="row top-trainings-subtitle">
                    <div className="col s8 offset-s2">
                        <p className="center">Nazwa</p>
                    </div>
                    <div className="col s2">
                        <p className="right">Ilość</p>
                    </div>
                </div>
                <div className="divider top-trainers-divider"></div>
                { trainings }
            </div>         
        )
    }    
}

export default TopTraining
