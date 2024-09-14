import React, {useState, useEffect} from 'react';
import './Stats.css';
import { BasicColumns, BasicAvgColumns, ShootingColumns, ShootingAvgColumns,
    AdvancedColumns, AdvancedAvgColumns, BasicYearColumns, BasicYearAvgColumns,
    ShootingYearColumns, ShootingYearAvgColumns, AdvancedYearColumns, AdvancedYearAvgColumns,
    BasicGameColumns, ShootingGameColumns, AdvancedGameColumns
 } from '../constants/columns';
import DataTable from '../components/DataTable';
const Stats = () => {

    const [careerStats, setCareerStats] = useState([]);
    const [yearStats, setYearStats] = useState([]);
    const [gameStats, setGameStats] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const baseURL = process.env.REACT_APP_BACKEND_URL;

        try{
            const response = await fetch(`${baseURL}/stats`);
            const data = await response.json();
            setCareerStats(data.career_stats);
            setYearStats(data.yearly_stats);
            setGameStats(data.game_stats);
        }catch(error){
            console.error('Error fetching data: ', error);
        }
    };

    
    
    const CareerRowsBasic = careerStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        games: stat.games_played,
        points: stat.points,
        minutes: stat.minutes,
        rebounds: stat.rebounds,
        assists: stat.assists,
        steals: stat.steals,
        blocks: stat.blocks,
        turnovers: stat.turnovers,
        fouls: stat.fouls,
        field_goals: stat.field_goals_made,
        three_pointers: stat.three_point_field_goals_made,
        free_throws: stat.free_throws_made
    }));

    const CareerRowsAvgBasic = careerStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        games: stat.games_played,
        points: stat.avg_points,
        minutes: stat.avg_minutes,
        rebounds: stat.avg_rebounds,
        assists: stat.avg_assists,
        steals: stat.avg_steals,
        blocks: stat.avg_blocks,
        turnovers: stat.avg_turnovers,
        fouls: stat.avg_fouls,
        field_goals: stat.avg_field_goals_made,
        three_pointers: stat.avg_three_point_field_goals_made,
        free_throws: stat.avg_free_throws_made
    }));


    const CareerRowsShooting = careerStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        games: stat.games_played,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.three_point_field_goals_made,
        three_pointers_attempted: stat.three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.free_throws_made,
        free_throws_attempted: stat.free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const CareerRowsShootingAvg = careerStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        games: stat.games_played,
        field_goals: stat.avg_field_goals_made,
        field_goals_attempted: stat.avg_field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.avg_three_point_field_goals_made,
        three_pointers_attempted: stat.avg_three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.avg_free_throws_made,
        free_throws_attempted: stat.avg_free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const CareerRowsAdvanced = careerStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        games: stat.games_played,
        avg_game_score: stat.career_avg_gamescore,
        effective_field_goal_percentage: stat.career_effective_field_goal_percentage,
        true_shooting_percentage: stat.career_true_shooting_percentage,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.three_point_field_goals_made,
        three_pointers_attempted: stat.three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.free_throws_made,
        free_throws_attempted: stat.free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const CareerRowsAdvancedAvg = careerStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        games: stat.games_played,
        effective_field_goal_percentage: stat.career_effective_field_goal_percentage,
        true_shooting_percentage: stat.career_true_shooting_percentage,
        avg_game_score: stat.career_avg_gamescore,
        field_goals: stat.avg_field_goals_made,
        field_goals_attempted: stat.avg_field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.avg_three_point_field_goals_made,
        three_pointers_attempted: stat.avg_three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.avg_free_throws_made,
        free_throws_attempted: stat.avg_free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const SingleYearRowsBasic = yearStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        olympic_year: stat.year,
        games: stat.games_played,
        points: stat.points,
        minutes: stat.minutes,
        rebounds: stat.rebounds,
        assists: stat.assists,
        steals: stat.steals,
        blocks: stat.blocks,
        turnovers: stat.turnovers,
        fouls: stat.fouls,
        field_goals: stat.field_goals_made,
        three_pointers: stat.three_point_field_goals_made,
        free_throws: stat.free_throws_made
    }));

    const SingleYearRowsAvgBasic = yearStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        olympic_year: stat.year,
        games: stat.games_played,
        points: stat.avg_points,
        minutes: stat.avg_minutes,
        rebounds: stat.avg_rebounds,
        assists: stat.avg_assists,
        steals: stat.avg_steals,
        blocks: stat.avg_blocks,
        turnovers: stat.avg_turnovers,
        fouls: stat.avg_fouls,
        field_goals: stat.avg_field_goals_made,
        three_pointers: stat.avg_three_point_field_goals_made,
        free_throws: stat.avg_free_throws_made
    }));

    const SingleYearRowsShooting = yearStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        olympic_year: stat.year,
        games: stat.games_played,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.three_point_field_goals_made,
        three_pointers_attempted: stat.three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.free_throws_made,
        free_throws_attempted: stat.free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const SingleYearRowsShootingAvg = yearStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        olympic_year: stat.year,
        games: stat.games_played,
        field_goals: stat.avg_field_goals_made,
        field_goals_attempted: stat.avg_field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.avg_three_point_field_goals_made,
        three_pointers_attempted: stat.avg_three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.avg_free_throws_made,
        free_throws_attempted: stat.avg_free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const SingleYearRowsAdvanced = yearStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        olympic_year: stat.year,
        games: stat.games_played,
        avg_game_score: stat.avg_gamescore,
        effective_field_goal_percentage: stat.effective_field_goal_percentage,
        true_shooting_percentage: stat.true_shooting_percentage,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.three_point_field_goals_made,
        three_pointers_attempted: stat.three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.free_throws_made,
        free_throws_attempted: stat.free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const SingleYearRowsAdvancedAvg = yearStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        olympic_year: stat.year,
        games: stat.games_played,
        avg_game_score: stat.avg_gamescore,
        effective_field_goal_percentage: stat.effective_field_goal_percentage,
        true_shooting_percentage: stat.true_shooting_percentage,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.avg_three_point_field_goals_made,
        three_pointers_attempted: stat.avg_three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.avg_free_throws_made,
        free_throws_attempted: stat.avg_free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const SingleGameRowsBasic = gameStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        date: stat.date,
        olympic_year: stat.year,
        opponent: stat.opponent,
        minutes: stat.minutes,
        points: stat.points,
        rebounds: stat.rebounds,
        assists: stat.assists,
        steals: stat.steals,
        blocks: stat.blocks,
        turnovers: stat.turnovers,
        fouls: stat.fouls,
        field_goals: stat.field_goals_made,
        three_pointers: stat.three_point_field_goals_made,
        free_throws: stat.free_throws_made
    }));

    const SingleGameRowsShooting = gameStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        date: stat.date,
        olympic_year: stat.year,
        opponent: stat.opponent,
        minutes: stat.minutes,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.three_point_field_goals_made,
        three_pointers_attempted: stat.three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.free_throws_made,
        free_throws_attempted: stat.free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));

    const SingleGameRowsAdvanced = gameStats.map((stat, index) => ({
        id: index + 1,
        player: stat.player,
        country: stat.country,
        date: stat.date,
        olympic_year: stat.year,
        opponent: stat.opponent,
        game_score: stat.gamescore,
        effective_field_goal_percentage: stat.effective_field_goal_percentage,
        true_shooting_percentage: stat.true_shooting_percentage,
        field_goals: stat.field_goals_made,
        field_goals_attempted: stat.field_goals_attempted,
        field_goal_percentage: stat.field_goal_percentage,
        three_pointers: stat.three_point_field_goals_made,
        three_pointers_attempted: stat.three_point_field_goals_attempted,
        three_point_percentage: stat.three_point_percentage,
        free_throws: stat.free_throws_made,
        free_throws_attempted: stat.free_throws_attempted,
        free_throw_percentage: stat.free_throw_percentage
    }));


    const [statsType, setstatsTyoe] = useState('Career');
    const [statCategory, setstatCategory] = useState('Basic');
    const [toggle, setToggle] = useState('Totals'); 
    const [columns, setColumns] = useState(BasicColumns);
    const [rows, setRows] = useState(CareerRowsBasic);

    const handleToggleChange = (newToggle) => {
        if (statsType === 'Single Game') {
            setToggle('Totals');
        } else {
            setToggle(newToggle);
        }
    }
    useEffect(() => {
        getColumnsAndRows();
    },);

    const getColumnsAndRows = () => {
        const totals = toggle === 'Totals';
        switch(statsType){
            case 'Career':
                switch(statCategory){
                    case 'Basic':
                        setColumns(totals ? BasicColumns : BasicAvgColumns);
                        setRows(totals ? CareerRowsBasic : CareerRowsAvgBasic);
                        break;
                    case 'Shooting':
                        setColumns(totals ? ShootingColumns : ShootingAvgColumns);
                        setRows(totals ? CareerRowsShooting : CareerRowsShootingAvg);
                        break;
                    case 'Advanced':
                        setColumns(totals ? AdvancedColumns : AdvancedAvgColumns);
                        setRows(totals ? CareerRowsAdvanced : CareerRowsAdvancedAvg);
                        break;
                    default:
                        console.error('Invalid stat category');
                        break;
                }
                break;

            case 'Single Year':
                switch(statCategory){
                    case 'Basic':
                        setColumns(totals ? BasicYearColumns : BasicYearAvgColumns);
                        setRows(totals ? SingleYearRowsBasic : SingleYearRowsAvgBasic);
                        break;
                    case 'Shooting':
                        setColumns(totals ? ShootingYearColumns : ShootingYearAvgColumns);
                        setRows(totals ? SingleYearRowsShooting : SingleYearRowsShootingAvg);
                        break;
                    case 'Advanced':
                        setColumns(totals ? AdvancedYearColumns : AdvancedYearAvgColumns);
                        setRows(totals ? SingleYearRowsAdvanced : SingleYearRowsAdvancedAvg);
                        break;
                    default:
                        console.error('Invalid stat category');
                        break;
                }
                break;

            case 'Single Game':
                switch(statCategory){
                    case 'Basic':
                        setColumns(BasicGameColumns);
                        setRows(SingleGameRowsBasic);
                        break;
                    case 'Shooting':
                        setColumns(ShootingGameColumns);
                        setRows(SingleGameRowsShooting);
                        break;
                    case 'Advanced':
                        setColumns(AdvancedGameColumns);
                        setRows(SingleGameRowsAdvanced);
                        break;
                    default:
                        console.error('Invalid stat category');
                        break;
                }
                break;

            default:
                break;
        }
    };


    return (
        <div>
            <h1>View Stats</h1>

            {/* Main buttons */}
            <div className='options-container'>
                <button 
                    className={`stat_button ${statsType === 'Career' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => setstatsTyoe('Career')}
                >
                    Career
                </button>
                <button 
                    className={`stat_button ${statsType === 'Single Year' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => setstatsTyoe('Single Year')}
                >
                    Single Year
                </button>
                <button 
                    className={`stat_button ${statsType === 'Single Game' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => setstatsTyoe('Single Game')}
                >
                    Single Game
                </button>
            </div>

            {/* Stat option buttons */}
            <div className='basic-shooting-adv-buttons'>
                <button 
                    className={`stat_button ${statCategory === 'Basic' ? 'active' : ''}`} 
                    type='button'
                    onClick={() => setstatCategory('Basic')}
                >
                    Basic
                </button>
                <button 
                    className={`stat_button ${statCategory === 'Shooting' ? 'active' : ''}`}
                    type='button'
                    onClick={() => setstatCategory('Shooting')}
                >
                    Shooting
                </button>
                <button 
                    className={`stat_button ${statCategory === 'Advanced' ? 'active' : ''}`}
                    type='button'
                    onClick={() => setstatCategory('Advanced')}
                >
                    Advanced
                </button>
            </div>

            {/* Totals/Averages switch */}
            <div className='totals-avg-switch'>
                <label>
                    <input
                        type="checkbox"
                        checked={toggle === 'Totals'}
                        onChange={() => handleToggleChange('Totals')}
                    />
                    Totals
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={toggle === 'Avg'}
                        onChange={() => handleToggleChange('Avg')}
                    />
                    Avg
                </label>
            </div>

            {/* Data Table */}
            <div className = 'data-container'>
                <DataTable rows={rows} columns={columns} />
            </div>


        </div>
    )
}

export default Stats;