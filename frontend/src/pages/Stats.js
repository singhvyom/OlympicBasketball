import React, {useState, useEffect} from 'react';
import ColorToggleButton from '../components/ColorToggleButton';
import './Stats.css';
import DataTable from '../components/DataTable';
const Stats = () => {
    // need these buttons
    // Career, Single Year, Single Game
    //smaller buttons for per game avg or totals (not on single game)
    // Career is just each player all time stats
        // display name with country
    //Single Year is just each player stats per year ranked
        //players can appear twice, for each year they played
        // display name with country and year before stats
    //Single Game is just each player stats per game ranked
        // display name with country and game date + opponent before stats
    // display stats in table
    //give options for basic, shooting, advanced stats
        //gamescore available for single game
    //table will allow sorting all these stats, and filter by country
    //stats will be fetched from the backend

    

    const BasicColumns = [
        {
            field: 'player', 
            headerName: 'Player',
            width: 150
        },
        {
            field: 'points',
            headerName: 'Points',
            width: 110
        },
        {
            field: 'rebounds',
            headerName: 'Rebounds',
            width: 110
        },
        {
            field: 'assists',
            headerName: 'Assists',
            width: 110
        },
        {
            field: 'steals',
            headerName: 'Steals',
            width: 110
        },
        {
            field: 'blocks',
            headerName: 'Blocks',
            width: 110
        },
        {
            field: 'turnovers',
            headerName: 'Turnovers',
            width: 110
        },
        {
            field: 'fouls',
            headerName: 'Fouls',
            width: 110
        },
        {
            field: 'field_goals',
            headerName: 'Field Goals',
            width: 110
        },
        {
            field: 'three_pointers',
            headerName: 'Three Pointers',
            width: 110
        },
        {
            field: 'free_throws',
            headerName: 'Free Throws',
            width: 110
        }
    ]
    
    const Statrows = [
        {id: 1, player: 'Lebron James', points: 27, rebounds: 7, assists: 7, steals: 2, blocks: 1, turnovers: 3, fouls: 2, field_goals: 10, three_pointers: 2, free_throws: 5},
        {id: 2, player: 'Kevin Durant', points: 25, rebounds: 5, assists: 5, steals: 1, blocks: 2, turnovers: 2, fouls: 3, field_goals: 9, three_pointers: 3, free_throws: 4},
        {id: 3, player: 'Stephen Curry', points: 30, rebounds: 4, assists: 6, steals: 3, blocks: 0, turnovers: 2, fouls: 2, field_goals: 11, three_pointers: 5, free_throws: 3},
        {id: 4, player: 'Giannis Antetokounmpo', points: 28, rebounds: 12, assists: 5, steals: 2, blocks: 2, turnovers: 3, fouls: 3, field_goals: 10, three_pointers: 1, free_throws: 7},
        {id: 5, player: 'Kawhi Leonard', points: 24, rebounds: 6, assists: 4, steals: 2, blocks: 1, turnovers: 2, fouls: 2, field_goals: 9, three_pointers: 2, free_throws: 4},
        {id: 6, player: 'Anthony Davis', points: 22, rebounds: 10, assists: 3, steals: 2, blocks: 3, turnovers: 2, fouls: 3, field_goals: 8, three_pointers: 1, free_throws: 5},
        {id: 7, player: 'James Harden', points: 29, rebounds: 6, assists: 8, steals: 2, blocks: 1, turnovers: 4, fouls: 3, field_goals: 10, three_pointers: 3, free_throws: 6},
        {id: 8, player: 'Luka Doncic', points: 26, rebounds: 8, assists: 7, steals: 2, blocks: 1, turnovers: 3, fouls: 3, field_goals: 9, three_pointers: 2, free_throws: 6},
        {id: 9, player: 'Damian Lillard', points: 28, rebounds: 4, assists: 8, steals: 1, blocks: 0, turnovers: 3, fouls: 2, field_goals: 10, three_pointers: 4, free_throws: 4},
        {id: 10, player: 'Nikola Jokic', points: 26, rebounds: 10, assists: 8, steals: 1, blocks: 1, turnovers: 3, fouls: 3, field_goals: 9, three_pointers: 1, free_throws: 7},
        {id: 11, player: 'Joel Embiid', points: 27, rebounds: 11, assists: 3, steals: 1, blocks: 2, turnovers: 3, fouls: 3, field_goals: 10, three_pointers: 1, free_throws: 6},
        {id: 12, player: 'Karl-Anthony Towns', points: 24, rebounds: 12, assists: 4, steals: 1, blocks: 2, turnovers: 3, fouls: 3, field_goals: 9, three_pointers: 2, free_throws: 4},
        {id: 13, player: 'Bradley Beal', points: 30, rebounds: 4, assists: 6, steals: 1, blocks: 0, turnovers: 2, fouls: 2, field_goals: 11, three_pointers: 3, free_throws: 5},
        {id: 14, player: 'Paul George', points: 25, rebounds: 6, assists: 5, steals: 2, blocks: 1, turnovers: 2, fouls: 2, field_goals: 9, three_pointers: 2, free_throws: 5},
        {id: 15, player: 'Jayson Tatum', points: 26, rebounds: 7, assists: 5, steals: 1, blocks: 1, turnovers: 2, fouls: 2, field_goals: 10, three_pointers: 3, free_throws: 3},
        {id: 16, player: 'Jimmy Butler', points: 22, rebounds: 6, assists: 7, steals: 2, blocks: 1, turnovers: 3, fouls: 3, field_goals: 8, three_pointers: 1, free_throws: 5},
        {id: 17, player: 'Devin Booker', points: 27, rebounds: 4, assists: 5, steals: 1, blocks: 0, turnovers: 2, fouls: 2, field_goals: 11, three_pointers: 3, free_throws: 3},
        {id: 18, player: 'Donovan Mitchell', points: 25, rebounds: 4, assists: 5, steals: 1, blocks: 0, turnovers: 2, fouls: 2, field_goals: 9, three_pointers: 2, free_throws: 5},
        {id: 19, player: 'Zion Williamson', points: 23, rebounds: 8, assists: 4, steals: 1, blocks: 1, turnovers: 2, fouls: 3, field_goals: 9, three_pointers: 0, free_throws: 5},
        {id: 20, player: 'Deandre Ayton', points: 20, rebounds: 10, assists: 2, steals: 1, blocks: 2, turnovers: 2, fouls: 3, field_goals: 8, three_pointers: 0, free_throws: 4},
    ]

    const [activeMainButton, setActiveMainButton] = useState('Career');
    const [activeStatButton, setActiveStatButton] = useState('Totals');
    
    const handleMainChange = (buttonName) => {
        setActiveMainButton(buttonName);
    };
    
    const handleStatChange = (buttonName) => {
        setActiveStatButton(buttonName);
    }


    return (
        <div>
            <h1>View Stats</h1>

            <div className='options-container'>
                <button 
                    className={`stat_button ${activeMainButton === 'Career' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => handleMainChange('Career')}
                >
                    Career
                </button>
                <button 
                    className={`stat_button ${activeMainButton === 'Single Year' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => handleMainChange('Single Year')}
                >
                    Single Year
                </button>
                <button 
                    className={`stat_button ${activeMainButton === 'Single Game' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => handleMainChange('Single Game')}
                >
                    Single Game
                </button>
            </div>

            <div className='totals-or-avg-buttons'>
                <button 
                    className={`stat_button ${activeStatButton === 'Totals' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => handleStatChange('Totals')}
                >
                    Totals
                </button>
                <button 
                    className={`stat_button ${activeStatButton === 'Per Game Avg' ? 'active' : ''}`}
                    type='button'
                    onClick={() => handleStatChange('Per Game Avg')}
                >
                    Per Game Avg
                </button>
            </div>

            <div className = 'data-container'>
                <DataTable rows={Statrows} columns={BasicColumns} />
            </div>


        </div>
    )
}

export default Stats;