import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import './FolderList.css';
import axios from 'axios';

const FolderList = ({top_teams}) => {

    const [flags, setFlags] = useState([]);
    useEffect(() => {
        const fetchFlags = async () => {
            const newFlags = [];
            for(const team of top_teams){
                try{
                    const response = await axios.get(`https://restcountries.com/v3.1/name/${team.team}`);
                    newFlags[team.team] = response.data[0]?.flags?.svg || '';
                }catch (error){
                    console.error('Error fetching flags: ', error);
                }
                
            }
            setFlags(newFlags);
        };

        fetchFlags();
    }, [top_teams]);

    return(
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
        {top_teams.map((team, index) => (
          <ListItem key={index} className="list-item">
            <ListItemAvatar>
              <Avatar className="avatar">
              {flags[team.team] ? (
                <img src={flags[team.team]} alt={`${team.team} flag`} style={{ width: '100%', height: 'auto' }} />
              ) : (
                <span>{team.team[0]}</span>
              )}
            </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={team.team}
              secondary={`${team.gold} Gold, ${team.silver} Silver, ${team.bronze} Bronze`}
              classes={{ primary: 'team-name', secondary: 'team-medals' }}
            />
          </ListItem>
        ))}
      </List>

    )
}

export default FolderList;