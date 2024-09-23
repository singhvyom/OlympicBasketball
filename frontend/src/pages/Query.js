import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import './Query.css';

const Query = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const baseURL = process.env.REACT_APP_BACKEND_URL;
        try{
            const response = await fetch(`${baseURL}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: query}),
            });
            const data = await response.json();
            setResponse(data.result);
        }catch(error){
            console.error(error);
            setResponse('An error occurred, please try again later');
        } finally {
            setLoading(false);
        }

    };




    return (
        <div className='query-container'>
            <h1>Search for Stats, Scores, & More!</h1>
            <h3>*queries may require more specific prompts for accurate results*</h3>

            <div className='textfield-container'>
                <Box sx={{width: 500, maxWidth: '100%'}}>
                    <TextField
                        id='outlined-multiline-static'
                        label='Enter your query here'
                        placeholder='Ex: Who scored the most points in a single game?'
                        value={query}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </Box>
                {loading? (
                    <div className='progress-bar-container'>
                        <p>Thinking...</p>
                        <LinearProgress color='inherit' />
                    </div>
                ): (
                    <div classname='respinse-container'>
                        {<p>{response}</p>}
                    </div>
                    
                )}
                
            </div>

        </div>
    )
}

export default Query;