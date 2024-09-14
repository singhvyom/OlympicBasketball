import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Query.css';

const Query = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            setResponse(data.message);
        }catch(error){
            console.error(error);
            setResponse('An error occurred, please try again later');
        }

    };




    return (
        <div className='query-container'>
            <h1>Search for Stats, Scores,</h1>

            <div className='textfield-container'>
                <Box sx={{width: 500, maxWidth: '100%'}}>
                    <TextField
                        id='outlined-multiline-static'
                        label='Enter your query here'
                        placeholder='Ex: Who is the all time leading scorer from the USA?'
                        value={query}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </Box>
                {<p>{response}</p>}
            </div>

        </div>
    )
}

export default Query;