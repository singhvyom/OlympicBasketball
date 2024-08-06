import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';

const YearlyScores = () => {
    const {year} = useParams();
    const [scores, setScores] = useState('');

    const fetchScores = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/box_scores/${year}`);
            const text = await response.text();
            setScores(text);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }, [year]); // Dependency array includes `year`

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    return (
        <div>
            <h2>Scores for {year}</h2>
            <pre>{scores}</pre>
        </div>
    );


}


export default YearlyScores;