import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {
    constructor(props) {
        super(props);
        this.team = this.props.team;
        this.teamIndex = this.props.teamIndex;
        this.state = {
            disabled: true,
            team: this.team,
            orderDefault: 'nameAscending'
        }

        this.formValidation = this.formValidation.bind(this);
        this.removeChannel = this.removeChannel.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        
    }

    formValidation(event) {
        const {value} = event.target;
        value !== '' && isNaN(value) ? this.setState({disabled: false}) : this.setState({disabled: true})
    }

    removeChannel(index) {
        let deleteChannel = this.state.team;
        deleteChannel.channels.splice(index,1);
        this.setState({team: deleteChannel })
        this.team = this.state.team;
    }

    addChannel() {
        let nameChannel = document.getElementById(this.teamIndex).value;
        let newChannel = this.state.team;
        let idx = newChannel.channels.length+1;
        newChannel.channels.push({
            name: nameChannel,
            index: idx 
        })
        document.getElementById(this.teamIndex).value = "";
        this.setState({
            team: newChannel,
            disabled: true
        })
    }
    
    sort() { 
        let team = this.state.team;
        switch (this.state.orderDefault) {
            case 'nameAscending':
                team.channels.sort((a, b) => a.name.localeCompare(b.name));
                console.log(team.channels);
                this.setState({team: team, orderDefault: 'nameDescending'})
                break;
            case 'nameDescending':
                team.channels.sort((a, b) => b.name.localeCompare(a.name));
                console.log(team.channels);
                this.setState({team: team, orderDefault: 'order'})
                break;
            case 'order':
                team.channels.sort((a, b) => a.index - b.index);
                console.log(team.channels);
                this.setState({team: team, orderDefault: 'nameAscending'})
                break;
            default:
                break;
        } 
    }

    render() {
        const {disabled} = this.state;
        return (
        <div>
            {
                this.team && 
                <div>
                    <span className="team-name">{this.team.name}</span>
                    <button className="sort" onClick={this.sort}>&#8597;</button>
                    <span className="add-channel">
                        <input id={this.teamIndex} onChange={this.formValidation} placeholder="Channel name"/>
                        <button 
                        disabled={disabled}
                        onClick={this.addChannel}>&#8853;</button>
                    </span>
                </div>
            }
            {
                this.team &&
                <ul className="one">
                    { this.team.channels && this.team.channels.map((channel, idx) => (
                        <li className="channel-name" key={channel.index}>
                            <span>{channel.name}</span>
                            <button onClick={() => this.removeChannel(idx)}>&#8854;</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
        );
    }
}

export default TeamComponent;
