import React, { Component } from 'react'
import './all_trainings.scss';

class AllTrainings extends Component {
    state = {
        trainings: [
            { id: 1, name: 'Trening w domu dla początkujących', createdAt: '05-02-2020', amountOfPeople: 15000, imageUrl: 'trening_1.jpg' },
            { id: 2, name: 'Trening na poręczach', createdAt: '05-02-2020', amountOfPeople: 12000, imageUrl: 'trening_2.jpg' },
            { id: 3, name: 'Korpus ze stali', createdAt: '05-02-2020', amountOfPeople: 5000, imageUrl: 'trening_3.jpg' },
            { id: 4, name: 'Trening w domu dla zaawansowanych', createdAt: '05-02-2020', amountOfPeople: 8000, imageUrl: 'trening_4.jpg' },
            { id: 5, name: 'Naucz się planche', createdAt: '05-02-2020', amountOfPeople: 1000, imageUrl: 'trening_5.jpg' },
            { id: 6, name: 'Naucz się stać na rękach', createdAt: '05-02-2020', amountOfPeople: 3000, imageUrl: 'trening_6.jpg' },
        ]
    }
    render() {
        const trainingList = this.state.trainings.map((training) => {            
            return (
                <div className="col s12 l4 xl3" key={ training.id }>
                    <div className="card">
                        <div className="card-image ">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ training.name } />
                        </div>
                        <div className="card-content">
                            <p className="training-card-name truncate">{ training.name }</p>
                            <p className="training-card-subtitle valign-wrapper"><i className="material-icons taining-card-icon">today</i>{ training.createdAt }</p>
                            <p className="training-card-subtitle valign-wrapper"><i className="material-icons taining-card-icon">people</i>{ training.amountOfPeople }</p>
                        </div>
                        <div className="card-action">
                            <a href="#!" className="btn-small waves-effect red darken-1"><i className="material-icons left">delete</i>Usuń</a>                            
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="all-trainings wrapper">
                <h4>Wszystkie treningi</h4>
                <div className="row">
                    { trainingList }
                </div>
            </div>            
        )
    }    
}

export default AllTrainings
