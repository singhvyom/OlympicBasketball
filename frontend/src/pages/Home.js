import React, {useState, useEffect} from 'react';
import './Home.css';
import Hero from '../components/Hero';
import FolderList from '../components/FolderList';
import ColorToggleButton from '../components/ColorToggleButton';

const HomePage = () => {
    const [top_teams, set_teams] = useState([]);
    const [top_players, set_players] = useState([]);
    const [top_rebounders, set_rebounders] = useState([]);
    const [top_passers, set_passers] = useState([]);
    const [alignment, setAlignment] = useState('points');

    const buttons = [
        {value: 'points', label: 'Points'},
        {value: 'rebounds', label: 'Rebounds'},
        {value: 'assists', label: 'Assists'}
    ];

    useEffect(() => {
        fetchTeamsPlayers();
    }, []);

    const fetchTeamsPlayers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000');
            const data = await response.json();
            set_teams(data.top_teams);
            set_players(data.top_players);
            set_rebounders(data.top_rebounders);
            set_passers(data.top_passers);

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null){
            setAlignment(newAlignment);
        }
    }

    return (
        <div>
            <Hero />
            <div className = 'lists-container'>
                
                <div className='team-list'>
                    <h1>Top Teams</h1>
                    <FolderList top_teams={top_teams} />
                </div>

                <div className='player-list'>
                    <h1>All Time Leaders</h1>
                    <ColorToggleButton alignment={alignment} handleChange={handleChange} buttons = {buttons} />
                    <ul>
                        {alignment === 'points' && top_players.map((player, index) => (
                            <li key={index}>
                                {player.player}: {player.total_points} Points
                            </li>
                        ))}
                        {alignment === 'rebounds' && top_rebounders.map((player, index) => (
                            <li key={index}>
                                {player.player}: {player.total_rebounds} Rebounds
                            </li>
                        ))}
                        {alignment === 'assists' && top_passers.map((player, index) => (
                            <li key={index}>
                                {player.player}: {player.assists} Assists
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="points-table">
                    <h1>Points Table</h1>
                </div>

            </div>
        </div>
    )
}

export default HomePage;