import React, { Component } from 'react'
import './dashboard.scss';
import InfoCard from './info_card/info_card';
import CardWrapper from '../layout/card_wrapper/card_wrapper';
import TopWorkouts from '../workouts/top_workouts/top_workouts';
import Chart from './chart/chart';
import { Sidenav } from 'materialize-css';
import { connect } from 'react-redux';
import Alert from '../layout/alert/alert'

class Dashboard extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        Sidenav.init(elems);        
    }
    render() {
        const { topWorkouts } = this.props;        
        const { totalIncome, subscribers, numberOfWorkouts, verified } = this.props.user        
        const alert = !verified && (
            <div className="row">
                <div className="col s12">
                    <Alert content="Aby móc dodawać treningi przejdź do zakładki edytuj dane i uzupełnij wszystkie pola" />
                </div>
            </div>
        )        

        return (
            <div className="dashboard wrapper">
                <h4>Panel</h4>       
                { alert }
                <div className="row">
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="green" title="Zarobki (obecny miesiąc)" content={ totalIncome } icon="today" />
                    </div>
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="deep-purple" title="Zarobki (cały okres)" content={ totalIncome } icon="attach_money" />
                    </div>
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="blue" title="Liczba subskrypcji" content={ subscribers } icon="people" />
                    </div>
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="red" title="Dodane treningi" content={ numberOfWorkouts } icon="fitness_center" />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 xl8">
                        <CardWrapper title="Wykres zarobków">
                            <Chart />
                        </CardWrapper>                    
                    </div>
                    <div className="col s12 xl4">
                        <CardWrapper title="TOP 5 treningów">
                            <TopWorkouts data={ topWorkouts } />
                        </CardWrapper>
                    </div>
                </div>
            </div>
        )
    }    
}

function mapStateToProps(state) {    
    return {
        topWorkouts: state.workout.topWorkouts,
        user: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Dashboard)
