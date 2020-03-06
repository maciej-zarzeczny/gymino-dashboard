import React, { Component } from 'react'
import './dashboard.scss';
import InfoCard from './info_card/info_card';
import CardWrapper from '../layout/card_wrapper/card_wrapper';
import TopWorkouts from '../workouts/top_workouts/top_workouts';
import Chart from './chart/chart';
import { Sidenav } from 'materialize-css';
import { connect } from 'react-redux';

class Dashboard extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        Sidenav.init(elems);
    }
    render() {
        const { topWorkouts } = this.props;
        return (
            <div className="dashboard wrapper">
                <h4>Panel</h4>
                <div className="row">
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="green" title="Zarobki (obecny miesiąc)" content="PLN 2742" icon="today" />
                    </div>
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="deep-purple" title="Zarobki (cały okres)" content="PLN 23 783" icon="attach_money" />
                    </div>
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="blue" title="Liczba subskrypcji" content="1538" icon="people" />
                    </div>
                    <div className="col s12 m6 xl3">
                        <InfoCard accentColor="red" title="Dodane treningi" content="27" icon="fitness_center" />
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
        topWorkouts: state.workout.topWorkouts
    }
}

export default connect(mapStateToProps)(Dashboard)
