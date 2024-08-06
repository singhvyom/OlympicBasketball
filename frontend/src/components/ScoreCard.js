import React from 'react';
import { Link } from 'react-router-dom';
import './ScoreCard.css';

const ScoreCard = ({homeTeam, homeScore, awayTeam, awayScore, date, homeFlag, awayFlag, path}) => {

    return(
        <li className='cards__item'>
            <Link className='cards__item__link' to={path}>
                <div className='score-card'>
                    <h2>{date}</h2>
                    <div className='team-info'>
                        <img src={homeFlag} alt='home flag' className = 'team-flag' />
                        <div className='team-details'>
                            <h3>{homeTeam}</h3>
                            <div className='score'>
                                <span className = 'score-number'> {homeScore}</span> - <span className = 'score-number'>{awayScore}</span>
                            </div>
                            <h3>{awayTeam}</h3>
                        </div>
                        <img src={awayFlag} alt='away flag' className = 'team-flag' />
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default ScoreCard;