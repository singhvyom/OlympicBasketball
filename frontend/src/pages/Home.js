import React, {useState, useEffect} from 'react';
import './Home.css';
import Hero from '../components/Hero';
import FolderList from '../components/FolderList';

const HomePage = () => {
    const [top_teams, set_teams] = useState([]);
    const [top_players, set_players] = useState([]);
    const [top_rebounders, set_rebounders] = useState([]);
    const [top_passers, set_passers] = useState([]);

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

    return (
        <div>
            <Hero />
            <h1>Top Olympic Basketball Teams</h1>
            <div className='team-list'>
                <FolderList top_teams={top_teams} />
            </div>
            <h1>All Time Points Leaders</h1>
            <ul>
                {top_players.map((player, index) => (
                    <li key={index}>
                        {player.player}: {player.total_points} Points
                    </li>
                ))}
            </ul>
        </div>
    )


}

export default HomePage;