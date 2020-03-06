import React, { Component } from 'react';
import './top_workouts.scss';
import Preloader from '../../layout/preloader/preloader';

class topWorkouts extends Component {    
    render() {
        const { data } = this.props;
        const workoutsList = data ? data.map((workout) => {
            const amount = workout.amount > 1000 ? Math.floor(workout.amount / 1000) + ' K' : workout.amount;
            return (
                <div className="row valign-wrapper" key={ workout.id }>
                    <div className="col s2">
                        <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ workout.name } className="responsive-img training-image" />
                    </div>
                    <div className="col s8">
                        <p className="truncate training-name">{ workout.name }</p>
                    </div>
                    <div className="col s2">
                        <span className="amount right truncate">{ amount }</span>
                    </div>
                </div>
            );
        }) : (
            <Preloader active={ true } />
        );
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
                { workoutsList }
            </div>         
        )
    }    
}

export default topWorkouts
