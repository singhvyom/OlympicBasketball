import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [top_teams, set_teams] = useState([]);
  const [top_players, set_players] = useState([]);

  useEffect(() => {
    fetchTeamsPlayers();
  }, []);

  const fetchTeamsPlayers = async () => {
    const response = await fetch('http://127.0.0.1:5000');
    const data = await response.json();
    set_teams(data.top_teams);
    set_players(data.top_players);
  }

  return (
    <div>
    <h1>Top Teams</h1>
    <ul>
      {top_teams.map((team, index) => (
        <li key={index}>
          {team.team}: {team.gold} Gold, {team.silver} Silver, {team.bronze} Bronze, Total Medals: {team.total_medals}
        </li>
      ))}
    </ul>
    <h1>Top Players</h1>
    <ul>
      {top_players.map((player, index) => (
        <li key={index}>
          {player.player}: {player.total_points} Points
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App;
