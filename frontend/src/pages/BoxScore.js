import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import './BoxScore.css';

const BoxScore = () => {
    const {year, homeTeam_vs_awayTeam_date} = useParams();
    const [boxScore, setBoxScore] = useState(null);

    useEffect(() => {
        const fetchBoxScores = async () => {
            const baseURL = process.env.REACT_APP_BACKEND_URL
            try {
                const response = await fetch(`${baseURL}/scores/${year}/${homeTeam_vs_awayTeam_date}`);
                const data = await response.json();
                setBoxScore(data);
            }catch (error){
                console.error('Error fetching data: ', error);
            }
        };
    fetchBoxScores();
    }, [year, homeTeam_vs_awayTeam_date]);

    if (!boxScore){
        return <p>Loading...</p>
    }
    const {
        Home_box, 
        Away_box, 
        'Home Team':homeTeam, 
        'Away Team':awayTeam, 
        'Date':date,
        'Home Score':homeScore, 
        'Away Score':awayScore
    } = boxScore;
    
    const renderBoxScore = (team, stats) => {
        // Extract totals row, if it exists
        const totalsRow = stats['Totals'];
        // Filter out 'Totals' from the stats for rendering
        const filteredStats = Object.entries(stats).filter(([player]) => player !== 'Totals');
    
        return (
            <div className="team-box-score">
                <h3>{team} Stats</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Minutes</th>
                            <th>Points</th>
                            <th>Offensive Rebounds</th>
                            <th>Defensive Rebounds</th>
                            <th>Total Rebounds</th>
                            <th>Assists</th>
                            <th>Steals</th>
                            <th>Blocks</th>
                            <th>Turnovers</th>
                            <th>Fouls</th>
                            <th>Field Goals</th>
                            <th>3 Point Field Goals</th>
                            <th>Free Throws</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStats.map(([player, playerStats]) => (
                            playerStats && typeof playerStats === 'object' ? (
                                <tr key={player}>
                                    <td>{player}</td>
                                    <td>{playerStats.Minutes}</td>
                                    <td>{playerStats.Points}</td>
                                    <td>{playerStats['Offensive Rebounds']}</td>
                                    <td>{playerStats['Defensive Rebounds']}</td>
                                    <td>{playerStats['Total Rebounds']}</td>
                                    <td>{playerStats.Assists}</td>
                                    <td>{playerStats.Steals}</td>
                                    <td>{playerStats.Blocks}</td>
                                    <td>{playerStats.Turnovers}</td>
                                    <td>{playerStats.Fouls}</td>
                                    <td>{playerStats['Field Goals']}</td>
                                    <td>{playerStats['3 Point Field Goals']}</td>
                                    <td>{playerStats['Free Throws']}</td>
                                </tr>
                            ) : null
                        ))}
                        {/* Render Totals row if it exists */}
                        {totalsRow && (
                            <tr style={{ fontWeight: 'bold' }}>
                                <td>Totals</td>
                                <td></td> {/* Skip Minutes */}
                                <td>{totalsRow.Points}</td>
                                <td>{totalsRow['Offensive Rebounds']}</td>
                                <td>{totalsRow['Defensive Rebounds']}</td>
                                <td>{totalsRow['Total Rebounds']}</td>
                                <td>{totalsRow.Assists}</td>
                                <td>{totalsRow.Steals}</td>
                                <td>{totalsRow.Blocks}</td>
                                <td>{totalsRow.Turnovers}</td>
                                <td>{totalsRow.Fouls}</td>
                                <td>{totalsRow['Field Goals']}</td>
                                <td>{totalsRow['3 Point Field Goals']}</td>
                                <td>{totalsRow['Free Throws']}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className='box-score-container'>
            <h1>Box Score</h1>
            <h2>{homeTeam} vs {awayTeam}</h2>
            <p>{date}</p>
            <p>{homeTeam}: {homeScore}</p>
            <p>{awayTeam}: {awayScore}</p>

            {renderBoxScore(homeTeam, Home_box)}
            {renderBoxScore(awayTeam, Away_box)}

        </div>
    );
    
}

export default BoxScore;