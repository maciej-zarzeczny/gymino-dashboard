import React, { Component } from 'react'
import './all_workouts.scss';
import Preloader from '../../layout/preloader/preloader'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css'

import { connect } from 'react-redux'
import { getWorkouts, deleteWorkout } from '../../../redux/actions/workout_actions'
import moment from 'moment';

class AllTrainings extends Component {
    state = {
        id: '',
        imageName: ''
    }
    componentDidMount() {
        var modal = document.querySelector('.modal');
        M.Modal.init(modal);
        if (!this.props.workoutsLoaded) {
            this.props.getWorkouts()
        }        
    }    
    render() {
        const { workouts, isLoading } = this.props;                           
        const workoutsList = !isLoading ? workouts.length > 0 ? workouts.map((workout) => {
            const premiumBadge = workout.isPremium && (
                <div className="premium">PREMIUM</div>
            )
            return (
                <div className="col s12 xl4" key={ workout.id }>
                    <div className="card">
                        <div className="card-image">
                            <img src={ workout.image } alt={ workout.name } className="workout-image" />
                        </div>
                        <div className="card-content">
                            <p className="training-card-name truncate">{ workout.name }</p>
                            <p className="training-card-subtitle valign-wrapper"><i className="material-icons taining-card-icon">today</i>{ moment(workout.createdAt.toDate()).format('D-MM-YYYY') }</p>
                            <p className="training-card-subtitle valign-wrapper"><i className="material-icons taining-card-icon">people</i>{ workout.amount }</p>
                        </div>
                        <div className="card-action">
                            <button onClick={ () => this.setState({ id: workout.id, imageName: workout.imageName }) } data-target="confirmation-modal" className="btn-small waves-effect red darken-1 modal-trigger"><i className="material-icons left">delete</i>Usuń</button>
                        </div>  
                        { premiumBadge }
                    </div>
                </div>
            )
        }) : (
            <div>
                <p>Brak dodanych treningów</p>
                <NavLink to="/add-workout">
                    <button className="btn waves-effect btn-small red darken-1">Dodaj pierwszy trening</button>
                </NavLink>
            </div>
        ) : (            
            <Preloader active={ true } />
        )
        return (
            <div className="all-trainings wrapper">
                <h4>Wszystkie treningi</h4>
                <div className="row">
                    { workoutsList }
                </div>
                <div id="confirmation-modal" className="modal">
                    <div className="modal-content">
                        <h4>Usuwanie treningu</h4>
                        <p>Tej czynności nie można cofnąć. Czy na pewno chcesz usunąć wybrany trening?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat">Nie</button>
                        <button onClick={ () => this.props.deleteWorkout(this.state.id, this.state.imageName) } className="modal-close waves-effect waves-green btn-flat">Tak</button>
                    </div>
                </div>
            </div>            
        )
    }    
}

function mapStateToProps(state) {
    return {
        workouts: state.workout.workouts,
        isLoading: state.workout.isLoading,
        workoutsLoaded: state.workout.workoutsLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getWorkouts: () => dispatch(getWorkouts()),        
        deleteWorkout: (id, imageName) => dispatch(deleteWorkout(id, imageName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTrainings)