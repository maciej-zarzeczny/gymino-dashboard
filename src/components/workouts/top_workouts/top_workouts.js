import React, { Component } from 'react';
import './top_workouts.scss';

class topWorkouts extends Component {    
    render() {
        const { data } = this.props;
        const workoutsList = data.length > 0 ? data.map((workout) => {
            const amount = workout.amount > 1000 ? Math.floor(workout.amount / 1000) + ' K' : workout.amount;
            return (
                <div className="row valign-wrapper" key={ workout.id }>
                    <div className="col s1">
                        <img src={ workout.image } alt={ workout.name } className="responsive-img exercise-list-image" />
                    </div>
                    <div className="col s10">
                        <p className="truncate training-name">{ workout.name }</p>
                    </div>
                    <div className="col s1">
                        <span className="amount truncate">{ amount }</span>
                    </div>
                </div>
            );
        }) : (
            <p>Zbyt mało dodanych treningów</p>
        );
        return (
            <div>
                <div className="row top-trainings-subtitle">
                    <div className="col s9 offset-s2">
                        <p>Nazwa</p>
                    </div>
                    <div className="col s1">
                        <p>Ilość</p>
                    </div>
                </div>
                <div className="divider top-trainers-divider"></div>
                { workoutsList }
            </div>         
        )
    }    
}

export default topWorkouts
