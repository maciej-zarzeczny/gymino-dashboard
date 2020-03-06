import React, { Component } from 'react';

class AddedExercise extends Component {
    state = {        
        sets: [0],  
        rest: 0,
        setRest: 0,
        setsVisible: false,
    }
    addSet = () => {                
        let sets = [...this.state.sets, 0];            
        this.setState({
            sets
        });   
    }
    updateSet = (e, index) => {
        let sets = [...this.state.sets];
        let set = {...sets[index]};
        set = e.target.value;

        sets[index] = set;
        this.setState({
            sets
        });
    }
    updateRest = (e) => {
        this.setState({
            rest: e.target.value
        });
    }
    updateSetRest = (e) => {
        this.setState({
            setRest: e.target.value
        });
    }
    removeSet = (index) => {
        let sets = [...this.state.sets];
        sets.splice(index, 1);

        this.setState({
            sets
        });        
    }
    saveData = (id, saveFunction) => {        
        let rest = parseInt(this.state.rest);
        let setRest = parseInt(this.state.setRest);
        let sets = this.state.sets;
        let error = false;
        
        if (isNaN(rest) || isNaN(setRest)) {
            error = true;
            alert('Błąd: Wprowadzone zostały niepoprawne wartości');
        } else if (rest <= 0 || setRest <= 0) {
            error = true;
            alert('Błąd: Wprowadzne wartości muszą być większe od zera');
        } else if (sets.length <= 0) {
            error = true;
            alert('Błąd: Należy dodać co najmniej jedną serię');
        }

        for (let i = 0; i < sets.length; i++) {
            const set = sets[i];
            let numSet = parseInt(set);

            if (isNaN(numSet)) {
                error = true;
                alert('Błąd: Wprowadzone zostały niepoprawne wartości');
                break;  
            } else if (numSet <= 0) {
                error = true;
                alert('Błąd: Wprowadzne wartości muszą być większe od zera');
                break;
            } else {
                sets[i] = numSet;
            }            
        }

        if (!error) {
            this.setState({
                setsVisible: false,                
            });
            saveFunction(id, { sets, rest: rest, setRest: setRest });
        }
    }
    renderSets = () => {
        let setsToRender = '';
        this.state.sets.forEach(element => {
            setsToRender += 'x' + element.toString() + ' ';
        });

        return setsToRender;             
    }
    render() {
        const { exercise, removeExercise, updateSetsData } = this.props;
        const setsList = this.state.sets.length > 0 ? this.state.sets.map((set, index) => {
            return (
                <div key={ index }>
                    <div className="row valign-wrapper">
                        <div className="col s3 l2 ">
                            <p>Seria { index + 1 }:</p>
                        </div>
                        <div className="col s6 l4 input-field">
                            <input type="number" id={ "reps-input-" + index } onChange={ (e) => this.updateSet(e, index) } value={ this.state.sets[index] } />
                            <label className="active" htmlFor={ "reps-input-" + index }>Ilość powtórzeń</label>
                        </div>
                        <div className="col s3 l2 center">
                            <a href="#!" onClick={ () => this.removeSet(index) }><i className="material-icons red-text darken-1">remove_circle_outline</i></a>
                        </div>
                        <div className="col l4 hide-on-med-and-down"></div>
                    </div>                    
                </div>
            )
        }) : (
            <div></div>
        );     
        return (
            <div key={ exercise.id } className="card-panel">
                <div className={ this.state.setsVisible ? "row valign-wrapper" : "no-bottom-margin row valign-wrapper"}>
                    <div className="col s2">
                        <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ exercise.name } className="responsive-img exercise-image" />
                    </div>
                    <div className="col s7">
                        <p className="exercise-name truncate">{ exercise.name }</p>                        
                        { this.state.setsVisible ? (
                            <a href="#!" className="btn btn-small waves-effect green darken-1" onClick={ () => this.saveData(exercise.id, updateSetsData) }>Zapisz</a>
                        ) : (                  
                            <div>
                                <span>{ this.renderSets() }</span> 
                                <br/>                               
                                <a href="#!" onClick={ () => this.setState({setsVisible: true}) }>
                                    <i className="material-icons green-text darken-1">arrow_drop_down_circle</i>
                                </a>
                            </div>
                        ) }                    
                    </div> 
                    <div className="col s3">
                        <a href="#!" onClick={ () => removeExercise(exercise.id) } className="right"><i className="material-icons small red-text darken-1">delete</i></a>
                    </div>
                </div>
                { this.state.setsVisible && 
                    <div>
                        <div className="divider"></div>  
                        <div className="row rest-form">
                            <div className="col s12 input-field">
                                <input type="number" id="rest-input" onChange={ this.updateRest } value={ this.state.rest }/>
                                <label className="active" htmlFor="rest-input">Czas odpoczynku między seriami (sekundy)</label>
                            </div>
                            <div className="col s12 input-field">
                                <input type="number" id="set-rest-input" onChange={ this.updateSetRest } value={ this.state.setRest }/>
                                <label className="active" htmlFor="set-rest-input">Czas odpoczynku po ćwiczeniu (sekundy)</label>
                            </div>
                        </div>
                        { setsList }
                        <a href="#!" onClick={ () => this.addSet() }><i className="material-icons green-text darken-1">add_circle_outline</i></a>
                    </div>
                }
            </div>
        )
    }    
}

export default AddedExercise
