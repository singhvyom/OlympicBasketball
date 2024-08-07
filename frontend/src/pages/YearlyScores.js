import React, {useState, useEffect, useCallback} from 'react';
import './YearlyScores.css';
import ScoreCard from '../components/ScoreCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const YearlyScores = () => {
    const {year} = useParams();
    const [scores, setScores] = useState([]);
    const [flags, setFlags] = useState([]);
    const [medalists, setMedalists] = useState([]);

    const fetchScores = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/scores/${year}`);
            const data = await response.json();
            setScores(data.scores);
            fetchFlags(data.scores);
            setMedalists(data.medal_results);

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }, [year]); // Dependency array includes `year`

    const fetchFlags = async(scores) => {
        const newFlags = [];
        for (const game of scores){

            try {
                const homeFlagResponse = await axios.get(`https://restcountries.com/v3.1/name/${game['Home Team']}`);
                const awayFlagResponse = await axios.get(`https://restcountries.com/v3.1/name/${game['Away Team']}`);
                newFlags[game['Home Team']] = homeFlagResponse.data[0]?.flags?.svg || '';
                newFlags[game['Away Team']] = awayFlagResponse.data[0]?.flags?.svg || '';
            }catch (error){
                console.error('Error fetching flags: ', error);
            }

        }
        setFlags(newFlags);
    }


    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    return (
        <div>
            <h2 className = 'score-title'>Scores for {year}</h2>
            <div className='medalists'>
                <div className='medalist'>
                    <h4>Gold: {medalists['gold'] || 'N/A'}</h4>
                </div>
                <div className='medalist'>
                    <h4>Silver: {medalists['silver'] || 'N/A'}</h4>
                </div>
                <div className='medalist'>
                    <h4>Bronze: {medalists['bronze'] || 'N/A'}</h4>
                </div>
            </div>
            <ul className = 'score_cards__items'>
                {scores.map((game, index) => (
                    <ScoreCard
                        key = {index}
                        homeTeam = {game['Home Team']}
                        homeScore = {game['Home Score']}
                        awayTeam = {game['Away Team']}
                        awayScore = {game['Away Score']}
                        date = {game['Date']}
                        homeFlag = {flags[game['Home Team']]}
                        awayFlag = {flags[game['Away Team']]}
                        // path = {`/scores/${year}/${game['Home Team']} vs ${game['Away Team']}`}
                        path={`/scores/${year}/${encodeURIComponent(game['Home Team'])}_vs_${encodeURIComponent(game['Away Team'])}_${encodeURIComponent(game['Date'])}`}
                    />
                ))}
            </ul>
        </div>
    );


}


export default YearlyScores;