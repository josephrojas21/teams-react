import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.teams = [];
        this.teams.push({
            name: 'Team1',
            channels: [{
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }]
        });
        this.teams.push({
            name: 'Team2',
            channels: [{
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }]
        });
        this.state = {
            teams: this.teams,
            disabled: true
        };

        this.formValidation = this.formValidation.bind(this);
        this.addTeam = this.addTeam.bind(this);
    }

    componentDidMount() {
        
    }

    formValidation(event) {
        const {value} = event.target;
        value !== '' && isNaN(value) ? this.setState({disabled: false}) : this.setState({disabled: true})
    }

    addTeam() { 
        let nameTeam = document.getElementById("newTeam").value
        let newTeam = this.state.teams;
        newTeam.push({
            name: nameTeam,
            channels: []
        })
        this.setState({teams: newTeam})
        
    }

    render() {
        const { disabled} = this.state
        return (
            <div>
                <div className="teams-list">
                    <ul>
                        { this.teams && this.teams.map((team, idx) => (
                            <li key={idx}>
                                <TeamComponent team={team}/>
                            </li>
                        ))}
                    </ul>  
                </div>
                <div className="add-team">
                    <b>Add Team</b>
                    <input id="newTeam" onChange={this.formValidation} placeholder="Team name"/>
                    <button
                    onClick={this.addTeam}
                    disabled={disabled}>&#8853;</button>
                </div>
            </div>
        );
    }
}

export default TeamList;
