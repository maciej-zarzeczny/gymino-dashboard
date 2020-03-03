import React, { Component } from 'react';

class Exercises extends Component {
    state = {
        exercises: [
            { id: 1, name: 'Wyciskanie na ławcze płaskiej leżąc', rest: 0, setRest: 0, sets: [] },
            { id: 2, name: 'Front Lever', rest: 0, setRest: 0, sets: [] },
            { id: 3, name: 'Back Lever', rest: 0, setRest: 0, sets: [] },
            { id: 4, name: 'Podciąganie nachwytem', rest: 0, setRest: 0, sets: [] },
        ],
    }
    render() {
        const { addExercise } = this.props;
        const exercisesList = this.state.exercises.map((exercise) => {
            return (
                <div key={ exercise.id }>
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ exercise.name } className="responsive-img exercise-image" />
                        </div>
                        <div className="col s7">
                            <p className="exercise-name truncate">{ exercise.name }</p>
                        </div>
                        <div className="col s3">
                            <a href="#!" onClick={ () => addExercise(exercise) } className="btn waves-effect blue darken-1 right">Dodaj</a>
                        </div>                    
                    </div>
                    <div className="divider"></div>
                </div>
            );
        });
        return (
            <div>
                <p className="card-top-title">Baza ćwiczeń</p>
                <div className="exercises-card z-depth-1">
                    <div className="exercises-card-header row valign-wrapper">                                
                        <div className="col s12 xl5 input-field">
                            <select defaultValue="0">
                                <option value="0" disabled>Partia mięśniowa</option>
                                <option value="1">Brzuch</option>
                                <option value="2">Biceps</option>
                                <option value="3">Triceps</option>
                                <option value="4">Klatka</option>
                                <option value="5">Plecy</option>
                                <option value="6">Nogi</option>
                                <option value="7">Barki</option>
                                <option value="8">Całe ciało</option>
                            </select>                                    
                        </div>
                        <div className="col s11 xl6 input-field">                                    
                            <input id="search" type="text" />
                            <label htmlFor="search">Szukaj...</label>
                        </div>
                        <div className="col s1 xl1">
                            <i className="material-icons right">search</i>
                        </div>
                    </div>
                    <div className="exercises-card-content">
                        { exercisesList }
                    </div>
                </div>
            </div>
        )
    }
}

export default Exercises